// import jwt from "jsonwebtoken";

// const verifyToken = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     console.log("Auth Header:", authHeader); // Ensure this prints

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Authentication token is missing or invalid" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded.id || !decoded.email) {
//       return res.status(401).json({ message: "Invalid token structure" });
//     }

//     req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
// const verifyToken = (req, res, next) => {
//   console.log("🔍 Inside verifyToken middleware");
//   const authHeader = req.headers.authorization;
//   //console.log("Auth Header:", authHeader); // Ensure this prints

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("Token from localStorage:", token);
//   if (!token) {
//     console.log("❌ Token missing after split");
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     //console.log("hii");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Ensure token is decoded
//     // Check if token is expired
//     // if (Date.now() >= decoded.exp * 1000) {
//     //   console.log("Token has expired");
//     //   return res.status(401).json({ message: "Token expired" });
//     // }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// const verifyToken = (req, res, next) => {
//   console.log("🔍 Inside verifyToken middleware");
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     console.log("❌ No token provided");
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];
//   console.log("🔑 Token from localStorage:", token);

//   if (!token) {
//     console.log("❌ Token missing after split");
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Decoded Token:", decoded); // Log the full decoded payload
    
//     if (!decoded.id || !decoded.email) {
//       console.log("❌ Invalid token structure");
//       return res.status(401).json({ message: "Invalid token structure" });
//     }

//     req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
//     next();
//   } catch (error) {
//     console.error("🚨 Token verification failed:", error.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
// export default verifyToken;
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  console.log("🔍 Inside verifyToken middleware");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔑 Token from request:", token);

  if (!token) {
    console.log("❌ Token missing after split");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    // Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      console.log("⏳ Token has expired! Generating a new one...");

      // Generate a new token with 1-day expiry
      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // You can adjust the duration
      );

      console.log("🔄 New Token:", newToken);
      res.setHeader("Authorization", `Bearer ${newToken}`);
      return res.status(401).json({
        message: "Token expired. A new token has been issued.",
        token: newToken,
      });
    }

    // Store user details in request
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();

  } catch (error) {
    console.error("🚨 Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
