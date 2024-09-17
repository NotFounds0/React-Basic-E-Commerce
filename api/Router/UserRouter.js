const userSchema = require("../Models/User.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/create", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Tüm alanların doldurulmuş olduğundan emin olun
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Tüm alanlar gereklidir." });
    }

    // Aynı e-posta adresi ile kullanıcı olup olmadığını kontrol et
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Yeni kullanıcı oluştur ve kaydet
    const newUser = new userSchema({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Kullanıcı Kayıt Başarılı" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu." });
  }
});

router.get("/get", async (req, res) => {
  try {
    const getUser = await userSchema.find();
    res.status(200).json(getUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const getUser = await userSchema.findById(req.params.id);
    if (!getUser) {
      res.status(200).json("Kullanıcı Bulunamadı");
    } else {
      res.status(200).json(getUser);
    }
  } catch (error) {
    console.log(error);
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    await userSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json("Kullanıcı Güncellendi");
  } catch (error) {
    console.log(error);
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    await userSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Kullanıcı Silindi");
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Bu Maile Ait Bir Kullanıcı Bulunamadı." });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(403).json({ error: "Yanlış Şifre." });
    } else {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Giriş Bilgileri Doğru.",
        token,
        user: {
          _id: user._id, // Kullanıcı ID'sini ekledik
          email: user.email,
          fullName: user.fullName,
        },
      });
    }
  } catch (error) {
    return res.status(400).json({
      error: "Kullanıcı Giriş Bilgileri Hatalı.",
      details: error.message,
    });
  }
});

module.exports = router;
