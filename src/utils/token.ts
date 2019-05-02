import * as jwt from 'jsonwebtoken';

export const updateToken = (token: string, expire: number | string): string => {
  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET);
    delete payload.exp;
    delete payload.iat;
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expire
    });
  }
  catch (e) {
    return '';
  }
};