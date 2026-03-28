import axios from "axios";
import express, { json } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import FormData from "form-data";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);

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
      { expiresIn: "7d" },
    );
    res.json({ token: ourToken });
  } catch (error) {
    console.log(error);
    console.log("Strapi error:", error.response?.data); // ← أضف هذا

    return res
      .status(401)
      .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
  }
});

const upload = multer({ storage: multer.memoryStorage() });

router.post("/products", upload.array("files.images"), async (req, res) => {
  try {
    console.log("req.files length:", req.files?.length);
    console.log(
      "file names:",
      req.files?.map((f) => f.originalname),
    );

    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const formdata = new FormData();

    req.files?.forEach((file) => {
      formdata.append("files", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });

    const uploadRes = await axios.post(
      `${process.env.STRAPI_URL}/api/upload`,
      formdata,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          ...formdata.getHeaders(),
        },
      },
    );

    const imageIds = uploadRes.data.map((img) => img.id);

    const productRes = await axios.post(
      `${process.env.STRAPI_URL}/api/products`,
      {
        data: {
          ...JSON.parse(req.body.data),
          image: imageIds,
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
    console.log("ERROR MESSAGE:", err.message);
    console.log("ERROR STATUS:", err.response?.status);
    console.log("ERROR RESPONSE:", err.response?.data);

    res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
});

// Delete Product
router.delete("/products/:documentId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const headers = {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    };

    const productRes = await axios.get(
      `${process.env.STRAPI_URL}/api/products/${req.params.documentId}?populate=image`,
      { headers },
    );

    const product = productRes.data.data;

    let images = [];

    if (Array.isArray(product?.image)) {
      images = product.image;
    } else if (Array.isArray(product?.image?.data)) {
      images = product.image.data;
    } else if (product?.image?.id) {
      images = [product.image];
    } else if (product?.image?.data?.id) {
      images = [product.image.data];
    }

    for (const file of images) {
      if (file?.id) {
        await axios.delete(
          `${process.env.STRAPI_URL}/api/upload/files/${file.id}`,
          { headers },
        );
      }
    }

    await axios.delete(
      `${process.env.STRAPI_URL}/api/products/${req.params.documentId}`,
      { headers },
    );

    res.json({ message: "تم الحذف بنجاح" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Edit Product
router.put(
  "/products/:documentId",
  upload.array("files.image"),
  async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET);

      let imageIds = [];
      if (req.files?.length > 0) {
        const formdata = new FormData();
        req.files.forEach((file) => {
          formdata.append(
            "files",
            new Blob([file.buffer], { type: file.mimetype }),
            file.originalname,
          );
        });
        const uploadRes = await axios.post(
          `${process.env.STRAPI_URL}/api/upload`,
          formdata,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
          },
        );
        imageIds = uploadRes.data.map((img) => img.id);
      }

      const updateData = { ...JSON.parse(req.body.data) };
      if (imageIds.length > 0) updateData.image = imageIds;

      const productRes = await axios.put(
        `${process.env.STRAPI_URL}/api/products/${req.params.documentId}`,
        { data: updateData },
        {
          headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
        },
      );

      res.json(productRes.data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
);

export default router;
