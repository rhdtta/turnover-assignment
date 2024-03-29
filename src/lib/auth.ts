import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.JWT_KEY);

// export const verifyToken = async(token: string) => {
//     try {
//         const verified = await jwtVerify(token, new TextEncoder().encode('secretAccessKey'))
//         return verified.payload;
//     } catch (error) {
//         throw new Error('Token has expired')
//     }
// }

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}
  