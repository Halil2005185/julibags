import axios from "axios";
import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are accepted"));
    }
  },
});

const uploadToCloudinary = async (buffer, folder) => {


  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const base64 = buffer.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: folder || "products",
  });

  return result;
};

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const strapiRes = await axios.post(
      `${process.env.STRAPI_URL}/admin/login`,
      req.body,
    );

    if (!strapiRes?.data?.data?.token) {
      return res
        .status(401)
        .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
    }

    const ourToken = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET,
      { expiresIn: "365d" },
    );
    res.json({ token: ourToken });
  } catch (error) {
    return res
      .status(401)
      .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
  }
});

// ✅ Add product
router.post("/products", upload.array("files.images"), async (req, res) => {
  const uploadedPublicIds = [];
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    // 1️⃣ ارفع الصور لـ Cloudinary مباشرة
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadToCloudinary(file.buffer, "julybags");
        uploadedPublicIds.push(result.public_id);
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }),
    );

    // 2️⃣ أضف المنتج لـ Strapi مع روابط الصور
    const productData = req.body.data ? JSON.parse(req.body.data) : {};

    const productRes = await axios.post(
      `${process.env.STRAPI_URL}/api/products`,
      {
        data: {
          ...productData,
          images: uploadedImages, // ✅ array من { url, public_id }
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      },
    );

    res.json(productRes.data);
  } catch (err) {
    // لو Strapi فشل احذف الصور من Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    for (const publicId of uploadedPublicIds) {
      await cloudinary.uploader.destroy(publicId);
    }
    console.log("❌ ADD ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ✅ Edit product
router.put(
  "/products/:documentId",
  upload.array("files.images"),
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET);

      const headers = {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      };

      let images = null;

      if (req.files?.length > 0) {
        // 1️⃣ احصل على الصور القديمة
        const oldProduct = await axios.get(
          `${process.env.STRAPI_URL}/api/products/${req.params.documentId}?populate=*`,
          { headers },
        );

        const oldImages = oldProduct.data?.data?.images || [];

        // 2️⃣ احذف الصور القديمة من Cloudinary
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        for (const img of oldImages) {
          if (img?.public_id) {
            await cloudinary.uploader.destroy(img.public_id);
          }
        }

        // 3️⃣ ارفع الصور الجديدة لـ Cloudinary
        images = await Promise.all(
          req.files.map(async (file) => {
            const result = await uploadToCloudinary(file.buffer, "julybags");
            return {
              url: result.secure_url,
              public_id: result.public_id,
            };
          }),
        );
      }

      // 4️⃣ حدّث المنتج في Strapi
      const updateData = { ...JSON.parse(req.body.data) };
      if (images) updateData.images = images;

      const productRes = await axios.put(
        `${process.env.STRAPI_URL}/api/products/${req.params.documentId}`,
        { data: updateData },
        { headers },
      );

      res.json(productRes.data);
    } catch (err) {
      console.log("❌ EDIT ERROR:", err.response?.data || err.message);
      res.status(500).json({ error: err.response?.data || err.message });
    }
  },
);

// ✅ Delete product
router.delete("/products/:documentId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const headers = {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    };

    // 1️⃣ احصل على بيانات المنتج
    const productRes = await axios.get(
      `${process.env.STRAPI_URL}/api/products/${req.params.documentId}?populate=*`,
      { headers },
    );

    const images = productRes.data?.data?.images || [];

    // 2️⃣ احذف الصور من Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    for (const img of images) {
      if (img?.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    // 3️⃣ احذف المنتج من Strapi
    await axios.delete(
      `${process.env.STRAPI_URL}/api/products/${req.params.documentId}`,
      { headers },
    );

    res.json({ message: "تم الحذف بنجاح" });
  } catch (err) {
    console.log("❌ DELETE ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
