import {hash, compare} from 'bcrypt';

export default {
  hashPass: async function (pass: string): Promise<string> {
    const hashPass = await hash(pass, 10);
    return hashPass;
  },
  comparePass: async function (pass: string, hash: string) {
    const isEquals = await compare(pass, hash);
    return isEquals;
  },
};
