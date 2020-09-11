"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
// interface asyncHandlerI {
//   func: (req: Request, res: Response, next: NextFunction) => void;
// }
exports.asyncHandler = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
};
