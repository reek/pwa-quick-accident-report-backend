import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request & { tokenContent?: any }, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const result = checkToken(token);

  if (result === null)
    return res.status(403).json({ error: { code: 403, message: 'You need to be authentified to access this part of the api', reason: 'Missing token' } });
  else if (result === false)
    return res.status(403).json({ error: { code: 403, message: 'You need to be authentified to access this part of the api', reason: 'Invalid or expired token' } });
  else {
    req.tokenContent = result;
    next();
  }
};


export const checkToken = (token): object | false | null => {
  if (!token)
    return null;

  try {
    const tokenContent = jwt.verify(token, process.env.JWT_SECRET);
    return tokenContent as object;
  }
  catch (e) {
    return false;
  }
};
