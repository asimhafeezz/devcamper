import { Request, Response, NextFunction } from "express";

// interface asyncHandlerI {
//   func: (req: Request, res: Response, next: NextFunction) => void;
// }

export const asyncHandler = (func: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    Promise.resolve(func(req, res, next)).catch(next);
}
