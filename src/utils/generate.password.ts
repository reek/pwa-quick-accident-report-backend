export const generatePassword = (min: number = 100000, max: number = 999999): string => {
    return (Math.random() * (max - min) + min).toString();
}