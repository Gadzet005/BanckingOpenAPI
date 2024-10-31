_:

let rootPath = ../../.;
in {
  languages = {
    python = {
      enable = true;
      venv = {
        enable = true;
        requirements = rootPath + /backend/requirements.txt;
      };
    };
  };
}
