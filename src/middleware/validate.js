function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(400).json({
        status: '400',
        mensagem: 'Dados inválidos.',
        erros: result.error.issues.map(({ path, message }) => ({ campo: path.join('.'), mensagem: message })),
      });
    }

    req[source] = result.data;
    return next();
  };
}

module.exports = validate;
