exports.getOnlyNumber = documentNumber => documentNumber.replace(/-/g, '').replace(/\./g, '').replace(/\//gi, '');
