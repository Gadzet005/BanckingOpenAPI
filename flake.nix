{
  description = "Open banking api shell.";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    devenv.url = "github:cachix/devenv";
    mk-shell-bin.url = "github:rrbutani/nix-mk-shell-bin";

    nix2container.url = "github:nlewo/nix2container";
    nix2container.inputs.nixpkgs.follows = "nixpkgs";
    devenv-root = {
      url = "file+file:///dev/null";
      flake = false;
    };
  };

  nixConfig = {
    extra-trusted-public-keys =
      "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = inputs@{ flake-parts, devenv-root, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      imports = [ inputs.devenv.flakeModule ];

      systems =
        [ "x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin" ];

      perSystem = { pkgs, ... }: {
        devenv.shells.default = {
          devenv.root =
            let devenvRootFileContent = builtins.readFile devenv-root.outPath;
            in pkgs.lib.mkIf (devenvRootFileContent != "")
            devenvRootFileContent;

          name = "Default dev shell.";

          #dotenv.enable = true;
          #dotenv.filename = ["./frontend/.env"];

          imports = [
            ./nix/pre-commit.nix
            ./nix/dev-shells/backend.nix
            ./nix/dev-shells/frontend.nix
          ];

          processes = {
            frontend.exec =
              "cd frontend && yarn install && yarn dev";
            backend.exec = 
              "cd backend/src && python manage.py migrate && python manage.py runserver";
          };

          containers."obp-api" = {
            name = "Open banking project.";
            defaultCopyArgs = "skopeo copy";
            startupCommand = "./nix/run.sh";
          };
        };
        devenv.shells.nix = {
          devenv.root =
            let devenvRootFileContent = builtins.readFile devenv-root.outPath;
            in pkgs.lib.mkIf (devenvRootFileContent != "")
            devenvRootFileContent;

          name = "Nix dev shell.";

          imports = [ ./nix/dev-shells/nix.nix ];
        };
      };

    };
}
