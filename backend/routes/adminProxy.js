import axios from "axios";
import express, { json } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
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
    console.log("STRAPI_URL:", process.env.STRAPI_URL);
    console.log("TOKEN:", process.env.STRAPI_API_TOKEN ? "موجود" : "غير موجود");
    console.log("files:", req.files?.length);
    console.log("body:", req.body);
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    const formdata = new FormData();
    req.files?.forEach((file) => {
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
    const imageIds = uploadRes.data.map((img) => img.id);

    const productRes = await axios.post(
      `${process.env.STRAPI_URL}/api/products`,
      {
        data: {
          ...JSON.parse(req.body.data),
          image: imageIds,
        },
      },
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } },
    );

    res.json(productRes.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
router.delete("/products/:documentId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);

    await axios.delete(
      `${process.env.STRAPI_URL}/api/products/${req.params.documentId}`,
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } },
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
