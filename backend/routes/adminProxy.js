import axios from "axios";
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    const strapiRes = await axios.post(
      `http://localhost1337/api/admin/login`,
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
    return res
      .status(401)
      .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
  }
});
export default router;
