const verificarStrings = (str1, str2) => {
    const arr1 = str1.toLowerCase().split('');
    const arr2 = str2.toLowerCase().split('');
    const str1ContemStr2 = arr2.every(char => arr1.includes(char));
    const str2ContemStr1 = arr1.every(char => arr2.includes(char));
    return str1ContemStr2 && str2ContemStr1;
};