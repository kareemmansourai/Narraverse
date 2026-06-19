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
        # rgthree — provides Fast Groups Bypasser (the 'Switch' node)
        "git clone https://github.com/rgthree/rgthree-comfy.git /root/ComfyUI/custom_nodes/rgthree-comfy",
        "pip install -r /root/ComfyUI/custom_nodes/rgthree-comfy/requirements.txt || true",

        # Create model directories
        "mkdir -p /root/ComfyUI/models/diffusion_models",
        "mkdir -p /root/ComfyUI/models/vae",
        "mkdir -p /root/ComfyUI/models/text_encoders",
        "mkdir -p /root/ComfyUI/models/model_patches",
        "mkdir -p /root/ComfyUI/models/upscale_models",
        
        "rm -rf /root/ComfyUI/input && mkdir -p /root/ComfyUI/input",
        "rm -rf /root/ComfyUI/output && mkdir -p /root/ComfyUI/output",

        # UNET — FLUX.2 Klein 4B distilled (~3 GB) — saved as the name the workflow expects
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error "
        "-o /root/ComfyUI/models/diffusion_models/flux-2-klein-base-4b-fp8.safetensors "
        "https://huggingface.co/Comfy-Org/flux2-klein-4B/resolve/main/split_files/diffusion_models/flux-2-klein-4b.safetensors",

        # CLIP / text encoder — Qwen 3 4B (~2.5 GB)
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error "
        "-o /root/ComfyUI/models/text_encoders/qwen_3_4b.safetensors "
        "https://huggingface.co/Comfy-Org/z_image_turbo/resolve/main/split_files/text_encoders/qwen_3_4b.safetensors",

        # VAE — flux2-vae (~335 MB)
        "aria2c --header='Authorization: Bearer $HF_TOKEN' -x 8 -s 8 --console-log-level=error "
        "-o /root/ComfyUI/models/vae/flux2-vae.safetensors "
        "https://huggingface.co/Comfy-Org/flux2-dev/resolve/main/split_files/vae/flux2-vae.safetensors",
    )
    .add_local_dir(
        local_path="./custom_nodes/SAGA_Multi_Reference",
        remote_path="/root/ComfyUI/custom_nodes/SAGA_Multi_Reference",
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