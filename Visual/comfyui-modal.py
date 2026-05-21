import modal
import os

HF_TOKEN = os.environ["HF_TOKEN"]

app = modal.App("comfyui")

image = (
    modal.Image.debian_slim(python_version="3.11")
    .apt_install("git", "aria2")
    .env({"HF_TOKEN": os.environ["HF_TOKEN"]})
    .run_commands(
        # ComfyUI + Manager
        "git clone https://github.com/comfyanonymous/ComfyUI.git /root/ComfyUI",
        "pip install -r /root/ComfyUI/requirements.txt",
        "git clone https://github.com/ltdrdata/ComfyUI-Manager.git /root/ComfyUI/custom_nodes/ComfyUI-Manager",
        "git clone https://github.com/ssitu/ComfyUI_UltimateSDUpscale.git /root/ComfyUI/custom_nodes/ComfyUI_UltimateSDUpscale",

        # Create model directories
        "mkdir -p /root/ComfyUI/models/diffusion_models",
        "mkdir -p /root/ComfyUI/models/vae",
        "mkdir -p /root/ComfyUI/models/text_encoders",
        "mkdir -p /root/ComfyUI/models/model_patches",
        "mkdir -p /root/ComfyUI/models/upscale_models",

        # UNET — 12.3 GB (biggest, download first)
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error -o /root/ComfyUI/models/diffusion_models/z_image_turbo_bf16.safetensors "
        "https://huggingface.co/Comfy-Org/z_image_turbo/resolve/main/split_files/diffusion_models/z_image_turbo_bf16.safetensors",

        # CLIP / text encoder — ~2.5 GB
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error -o /root/ComfyUI/models/text_encoders/qwen_3_4b.safetensors "
        "https://huggingface.co/Comfy-Org/z_image_turbo/resolve/main/split_files/text_encoders/qwen_3_4b.safetensors",

        # VAE — ~335 MB
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error -o /root/ComfyUI/models/vae/ae.safetensors "
        "https://huggingface.co/Comfy-Org/z_image_turbo/resolve/main/split_files/vae/ae.safetensors",

        # ControlNet patch — 3.1 GB
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error -o /root/ComfyUI/models/model_patches/Z-Image-Turbo-Fun-Controlnet-Union.safetensors "
        "https://huggingface.co/alibaba-pai/Z-Image-Turbo-Fun-Controlnet-Union/resolve/main/Z-Image-Turbo-Fun-Controlnet-Union.safetensors",

        # Upscaler — 9 MB
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error -o /root/ComfyUI/models/upscale_models/4x-ClearRealityV1.pth "
        "https://huggingface.co/Kim2091/ClearRealityV1/resolve/main/4x-ClearRealityV1.pth",
    )
)

@app.function(
    image=image,
    gpu="A10G",
    timeout=3600,
)
@modal.web_server(8188, startup_timeout=600)
def ui():
    import subprocess
    subprocess.Popen(
        "python /root/ComfyUI/main.py --listen 0.0.0.0",
        shell=True,
    )