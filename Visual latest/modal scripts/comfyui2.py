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
        
        "rm -rf /root/ComfyUI/input && mkdir -p /root/ComfyUI/input",
        "rm -rf /root/ComfyUI/output && mkdir -p /root/ComfyUI/output",

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

        # # Upscaler — 9 MB
        # "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error -o /root/ComfyUI/models/upscale_models/4x-ClearRealityV1.pth "
        # "https://huggingface.co/Kim2091/ClearRealityV1/resolve/main/4x-ClearRealityV1.pth",
        
        # # FLUX.2 Klein Base 4B FP8
        # "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error "
        # "-o /root/ComfyUI/models/diffusion_models/flux-2-klein-base-4b-fp8.safetensors "
        # "https://huggingface.co/black-forest-labs/FLUX.2-klein-base-4b-fp8/resolve/main/flux-2-klein-base-4b-fp8.safetensors",

        # # FLUX.2 Small Decoder
        # "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error "
        # "-o /root/ComfyUI/models/vae/full_encoder_small_decoder.safetensors "
        # "https://huggingface.co/black-forest-labs/FLUX.2-small-decoder/resolve/main/full_encoder_small_decoder.safetensors",
    )
)

# Mount a persistent volume for uploads
input_volume  = modal.Volume.from_name("comfyui-input",  create_if_missing=True)
output_volume = modal.Volume.from_name("comfyui-output", create_if_missing=True)

@app.function(
    image=image,
    gpu="A10G",
    timeout=3600,
    volumes={
        "/root/ComfyUI/input":  input_volume,   # FIX: path matches where ComfyUI expects input
        "/root/ComfyUI/output": output_volume,  # NEW: output images now persist here
    },
)
@modal.web_server(8188, startup_timeout=600)
def ui():
    import subprocess
    subprocess.Popen(
        "python /root/ComfyUI/main.py --listen 0.0.0.0",
        shell=True,
    )