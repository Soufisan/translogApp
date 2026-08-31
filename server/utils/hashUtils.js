import bcrypt from 'bcrypt';


export const hashString = async(str) => {
    try {
        const saltRounds = 9;
        const hashedStr = await bcrypt.hash(str, saltRounds);
        return hashedStr;
    } catch (error) {
        throw error;
    }
}

export const compareString = async(str, hashedStr) => {
    try {
        const match = await bcrypt.compare(str, hashedStr);
        return match
    } catch (error) {
        throw error
    }
}