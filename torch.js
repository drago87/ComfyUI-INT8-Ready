module.exports = {
  run: [
    // ─────────────────────────────────────────────────────────────────────
    // windows nvidia  →  Python 3.12 + torch 2.10.0 + cu130
    // ─────────────────────────────────────────────────────────────────────
    //
    // Targets (per ComfyUI Upgrade Manager design):
    //   - Python  : 3.12           (created by install.js via `uv venv --python 3.12`)
    //   - Torch   : 2.10.0+cu130   (official PyTorch cu130 index)
    //   - Vision/Audio : matching 2.10.x versions, picked by the resolver
    //   - triton  : triton-windows from PyPI (cp312 wheel published upstream)
    //   - sageattention : Comfy-Org wheel index (https://comfy-org.github.io/wheels)
    //   - flash_attn    : try Comfy-Org index; skip gracefully if no Windows wheel
    //
    // Note: we no longer hardcode cp310 wheel URLs — pip's resolver picks the
    // correct cp312/cu130 wheel automatically when pointed at the right index.
    // ─────────────────────────────────────────────────────────────────────
    {
      "when": "{{gpu === 'nvidia' && platform === 'win32'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu130 --force-reinstall --no-deps",
          "uv pip install triton-windows",
          // SageAttention: use the woct0rdho Windows abi3 wheel directly.
          // abi3 tag = stable limited API → works on Python 3.10/3.11/3.12/3.13.
          // cu130 + torch2.10.0andhigher.post5 = matches our torch 2.10.0+cu130 build.
          "uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post5/sageattention-2.2.0+cu130torch2.10.0andhigher.post5-cp310-abi3-win_amd64.whl",
          "uv pip install flash-attn --extra-index-url https://comfy-org.github.io/wheels || echo \"[INFO] flash_attn: no compatible cp312/cu130 Windows wheel, skipped.\""
        ]
      }
    },
    // windows amd
    {
      "when": "{{platform === 'win32' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch-directml torch torchaudio torchvision numpy==1.26.4 --force-reinstall"
      }
    },
    // windows cpu
    {
      "when": "{{platform === 'win32' && (gpu !== 'nvidia' && gpu !== 'amd')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio --force-reinstall --no-deps"
      }
    },
    // arm64 mac
    {
      "when": "{{platform === 'darwin' && arch === 'arm64'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio --force-reinstall --no-deps"
      }
    },
    // ─────────────────────────────────────────────────────────────────────
    // linux nvidia  →  Python 3.12 + torch 2.10.0 + cu130
    // ─────────────────────────────────────────────────────────────────────
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux'}}",
      "method": "shell.run",
      "params": {
        "bluefairy": "off",
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.10.0 torchvision==0.25.0 torchaudio==2.10.0 {{args && args.xformers ? 'xformers' : ''}} --index-url https://download.pytorch.org/whl/cu130 --force-reinstall",
          "uv pip install triton",
          // SageAttention: use the woct0rdho Windows abi3 wheel directly.
          // abi3 tag = stable limited API → works on Python 3.10/3.11/3.12/3.13.
          // cu130 + torch2.10.0andhigher.post5 = matches our torch 2.10.0+cu130 build.
          "uv pip install https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post5/sageattention-2.2.0+cu130torch2.10.0andhigher.post5-cp310-abi3-win_amd64.whl",
          "uv pip install flash-attn --extra-index-url https://comfy-org.github.io/wheels || echo \"[INFO] flash_attn: no compatible cp312/cu130 Linux wheel, skipped.\"",
          "uv pip install numpy==1.26.4"
        ]
      }
    },
    // linux rocm (amd)
    {
      "when": "{{platform === 'linux' && gpu === 'amd'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.10.0 torchvision torchaudio --index-url https://download.pytorch.org/whl/rocm6.3 --force-reinstall --no-deps"
      }
    },
    // linux cpu
    {
      "when": "{{platform === 'linux' && (gpu !== 'amd' && gpu !=='nvidia')}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu --force-reinstall --no-deps"
      }
    }
  ]
}
