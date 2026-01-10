import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


function createUser(req,res){
    const hashedPassword = bcrypt.hashSync(req.body.password, 10); // Hash the password with bcrypt

    const user = new User(
        {email : req.body.email,
        firstName : req.body.firstName,     
        lastName: req.body.lastName,
        password: hashedPassword}
    );

    user.save()
        .then(() => {
            res.status(201).json({
                message: 'User created successfully',
                
            });
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            
            // Check if it's a duplicate email error
            if (error.code === 11000) {
                return res.status(400).json({
                    message: 'Email already exists. Please use a different email.',
                    error: 'duplicate_email'
                });
            }
            
            // Check for validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: 'Validation failed. Please check your input.',
                    error: error.message
                });
            }
            
            // Generic error
            res.status(500).json({
                message: 'Error creating user. Please try again.',
                error: error.message
            });
        });
};

// Function to log in a user    
function logingUser(req, res) {
    User.findOne({ email : req.body.email }) 
    .then(
        (user) => {
             if (user == null){
                res.json({
                    message: 'User not found'
                });
             }
             else{
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password); // Compare the hashed password
                if(isPasswordValid){

                    // Generate a JWT token
                    const token = jwt.sign({ 
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified,
                    },"JwtSecretKey00" //secret key for signing token
                )
                 res.status(200).json({
                    message: 'Login successful',
                    token: token, 
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        isEmailVerified: user.isEmailVerified
                    }
                  })
                }else{
                    res.status(403).json({
                        message: 'Invalid password'
                    })
                }
             }
        })
    .catch(() => {
        res.status(401).json({
            message: 'Error logging in user'
        });
    })

};



function IsAddmin(req){
    
    if(req.user == null){
        return false;
    }

    if(req.user == null){
        return false
    }

    return true;
}














export { createUser , logingUser , IsAddmin };