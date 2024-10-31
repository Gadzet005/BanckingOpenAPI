_:

{
  pre-commit.hooks = {
    deadnix = {
      enable = true;
      args = [ "--edit" ];
    };
    nixfmt-classic.enable = true;
    statix.enable = true;
  };
}
