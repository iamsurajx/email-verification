import { SendVerificationCode, WelcomeEmail } from "../middleware/Email.js";
import Usermodel from "../models/User.js";
import bcryptjs from "bcrypt";

const Register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation: all fields are required
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if user already exists.
    const ExistsUser = await Usermodel.findOne({ email });
    if (ExistsUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Password Hashing
    const hashPassword = await bcryptjs.hash(password, 10);

    // Generate verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user
    const user = new Usermodel({
      email,
      password: hashPassword,
      name,
      verificationCode,
    });

    await user.save();
    
    // Send verification code
    await SendVerificationCode(user.email, verificationCode);

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email for verification.",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    
    const user = await Usermodel.findOne({ verificationCode: code });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or OTP expired.",
      });
    }

    user.isVerified = true;
    user.verificationCode = undefined; // Clear the verification code
    await user.save();
    
    // Send welcome email
    await WelcomeEmail(user.email, user.name);
   

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

export { Register, VerifyEmail };

// import { SendVerificationCode, WelcomeEmail } from "../middleware/Email.js";
// import Usermodel from "../models/User.js";
// import bcryptjs from "bcrypt";
// const Register = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     // Validation all fields are required
//     if (!email || !password || !name) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required..",
//       });
//     }

//     //Check If user already Exists.
//     const ExistsUser = await Usermodel.findOne({ email });
//     if (ExistsUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User Already Exists Please login",
//       });
//     }

//     //Password Hashing
//     const hashPassword = await bcryptjs.hashSync(password, 10);

//     //
//     const verificationCode = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();

//     // Create new user
//     const user = new Usermodel({
//       email,
//       password: hashPassword,
//       name,
//       verificationCode,
//     });

//     await user.save();
//     SendVerificationCode(user.email, verificationCode);
//     return res.status(200).json({
//       success: true,
//       message: "User Already Exists Please Login",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error.",
//     });
//   }
// };

// const VerifyEmail = async (req, res) => {
//   try {
//     const { code } = req.body;
//     const user = await Usermodel.findOne({
//       verificationCode: code,
//     });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Or OTP Expired",
//       });
//     }

//     (user.isVerified = true), (user.verificationCode = undefined);
//     await user.save();
//     await WelcomeEmail(user.name, user.email);
//     return res.status(200).json({
//       success: true,
//       message: "Email Verified Successfully",
//     });
//   } catch (error) {}
// };

// export {Register, VerifyEmail}
