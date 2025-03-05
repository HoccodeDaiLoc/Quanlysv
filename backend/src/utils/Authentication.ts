import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

interface Payload {
	userId?: number;
	role?: number;
	username: string;
	passwordChangeAt?: Date;
}

class Authentication {
	public static passwordHash(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	public static async passwordCompare(
		text: string,
		encryptedText: string
	): Promise<boolean> {
		return await bcrypt.compare(text, encryptedText);
	}

	public static generateResetToken() {
        return crypto.randomBytes(8).toString('hex');
    }

	public static generateAccessToken(
		id: number,
		role: number,
		username: string,
		passwordChangeAt: Date | undefined
	) {
		const secretKey: string = process.env.JWT_SECRET_KEY || 'my-secret-key';
		const payload: Payload = {
			userId: id,
			role: role,
			username: username,
		};
		if(passwordChangeAt) {
			payload.passwordChangeAt = passwordChangeAt;
		}
		const optionAccess = { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN };
		return jwt.sign(payload, secretKey, optionAccess);
	}

	public static generateRefreshToken(username: string, passwordChangeAt: Date | undefined) {
		const secretKey: string = process.env.JWT_SECRET_KEY || 'my-secret-key';
		const payload: Payload = {
			username: username,
			passwordChangeAt
		};
		const optionRefresh = { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN};
		return jwt.sign(payload, secretKey, optionRefresh);
	}

	public static validateToken(token: string): Payload | null {
		try {
			const secretKey: string = process.env.JWT_SECRET_KEY || 'my-secret-key';
			return jwt.verify(token, secretKey) as Payload;
		} catch (err) {
			throw err;
		}
	}
}

export default Authentication;
