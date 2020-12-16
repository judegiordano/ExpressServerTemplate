import bcrypt from "bcrypt";

/**
 * hash / salt a string
 * @param {string} string
 * @return {*}  {Promise<string>}
 */
export const hash = async (string: string): Promise<string> => {
	try {
		const salt = await bcrypt.genSalt(12);
		const hash = await bcrypt.hash(string, salt);
		return hash;
	} catch (e) {
		throw new Error(e);
	}
};

/**
  * compare a plaintext string
  * with a given hash
  * @param {string} pass
  * @param {string} hash
  * @return {*}  {Promise<boolean>}
  */
export const compare = async (pass: string, hash: string): Promise<boolean> => {
	try {
		const valid = await bcrypt.compare(pass, hash);
		return valid;
	} catch (e) {
		throw new Error(e);
	}
};
