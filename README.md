# Comfyui

A pinokio script for https://github.com/comfyanonymous/ComfyUI Ready for INT8
Model Support

| GPU                                  | Arch / CC       | VRAM     | INT8 ConvRot     | INT4 (future) | Notes                                                       |
| ------------------------------------ | --------------- | -------- | ---------------- | ------------- | ----------------------------------------------------------- |
| **GTX 1650**                         | Turing 7.5      | 4 GB     | ✅ (slow)         | ⚠️ exp.       | Cheapest Turing; VRAM too tight for Flux, OK for SD1.5 INT8 |
| **GTX 1660 / 1660 Super**            | Turing 7.5      | 6 GB     | ✅ confirmed      | ⚠️ exp.       | User-verified running INT8 ConvRot                          |
| **RTX 2060**                         | Turing 7.5      | 6–12 GB  | ✅                | ⚠️ exp.       | Oldest RTX; 12 GB variant much better for Flux              |
| **RTX 2070 / 2080 / 2080 Ti**        | Turing 7.5      | 8–11 GB  | ✅                | ⚠️ exp.       | 2080 Ti (11 GB) is the sweet spot for old Turing            |
| **Titan RTX**                        | Turing 7.5      | 24 GB    | ✅                | ⚠️ exp.       | Rare/pricey but 24 GB on Turing                             |
| **RTX 3060 / 3070 / 3080 / 3090**    | Ampere 8.6      | 8–24 GB  | ✅ fast           | ✅ safe        | 3090 (24 GB) is the community favorite for INT8/INT4        |
| **RTX 4060 Ti / 4070 / 4080 / 4090** | Ada 8.9         | 16–24 GB | ✅ fastest        | ✅ safe        | Also has FP8 for even better speed                          |
| GTX 1050/1060/1070/1080              | Pascal 6.1      | —        | ❌                | ❌             | No INT8 Tensor Cores, no cu130                              |
| GTX 950/960/970/980                  | Maxwell 5.x     | —        | ❌                | ❌             | No INT8 Tensor Cores, no cu130                              |
| AMD RX 7700 XT / 7800 XT / 7900      | RDNA3           | 12–24 GB | ⚠️ via ROCm fork | ❌ untested    | ComfyUI-INT8-Fast-ROCM exists but early                     |
| AMD RX 6800 / 6900 XT                | RDNA2 (gfx1030) | 16 GB    | ⚠️ unofficial    | ❌             | Not in ROCm 7.1 official list                               |
Based on https://github.com/pinokiofactory/comfy

Changes made
- Python  : 3.12
- Torch   : 2.10.0+cu130
 - Vision : 0.25.0
 - Audio : 2.10.0
- triton  : triton-windows from PyPI (cp312 wheel published upstream)
- sageattention : 2.2.0
- flash_attn    : try Comfy-Org index; skip gracefully if no Windows wheel

I have also added diffusion_models and text_encoders to the list of folders cheered between instance