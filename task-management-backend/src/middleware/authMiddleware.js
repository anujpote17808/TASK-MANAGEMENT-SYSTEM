const jwt = require("jsonwebtoken");


const protect = (req, res, next) => {

    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;


        // Check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                message: "Not authorized. Token required."
            });

        }


        // Extract token
        const token = authHeader.split(" ")[1];


        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Attach user information to request
        req.user = decoded;


        // Continue to next middleware/controller
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Not authorized. Invalid token."
        });

    }

};


module.exports = {
    protect
};