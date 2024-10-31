_:

{
  pre-commit = {
    addGcRoot = true;
    hooks = {
      # Formaters.
      actionlint.enable = true;
      black.enable = true;
      prettier.enable = true;
    };
  };
}
