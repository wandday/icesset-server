// import { response } from "express";
import TokenController from "../controller/TokenController";

const tokenController = new TokenController();
export const hasRole = (role, request, response, next) => {
    return(request, response, next) => {
        const bearerHeader = request.headers.authorization;
        if (typeof bearerHeader !== "undefined"){
            const bearerToken = bearerHeader.split(" ");
            const token = bearerToken[1]
            if (token) {
                tokenController
                .verifyToken(token)
                .then((user) => {
                    console.log("role is", role);

                    if (user.role == role) {
                        request.user = user;
                        if (request.user.email)
                        //console.log(user);
                        next();
                    } else{
                        const err = new Error("Access Denied");
                        err.status = 403;
                        next(err);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    next(err);
                });
            }
            else {
                const err = new Error(
                    'You need authentication to access this resource'
                );
                err.status = 401;
                next(err);
            }
        } else {
            const err = new Error(
                'You need authentication to access this resource'
            );
            err.status = 401;
            next(err);
        }
    };
};