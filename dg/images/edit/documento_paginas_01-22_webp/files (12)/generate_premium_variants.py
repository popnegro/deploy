#!/usr/bin/env python3
"""
Premium Image Variant Generator
Genera variantes visuales premium de proyectos usando Claude API y procesamiento de imágenes.
"""

import os
import sys
import json
import base64
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import requests
from typing import Dict, List, Tuple

# Config
PROJECT_IMAGES_PATH = Path(__file__).parent
OUTPUT_PATH = Path(__file__).parent / "variants"
OUTPUT_PATH.mkdir(exist_ok=True)

FORMATS = {
    "desktop": (1920, 1080),
    "social": (1200, 628),
    "instagram_portrait": (1080, 1350),
    "instagram_stories": (1080, 1920),
    "notebook": (1366, 768),
}

class PremiumVariantGenerator:
    def __init__(self):
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        if not self.api_key:
            print("⚠️  ANTHROPIC_API_KEY no configurada. Usando modo simulado.")
        
    def load_image(self, project_num: int) -> Image.Image:
        """Carga la imagen original del proyecto."""
        image_path = PROJECT_IMAGES_PATH / f"{project_num}.jpeg"
        if not image_path.exists():
            raise FileNotFoundError(f"Proyecto {project_num} no encontrado")
        return Image.open(image_path)
    
    def resize_for_format(self, image: Image.Image, format_key: str) -> Image.Image:
        """Redimensiona la imagen al formato especificado."""
        target_width, target_height = FORMATS[format_key]
        
        # Calcular ratio y redimensionar manteniendo aspecto
        aspect_ratio = image.width / image.height
        target_aspect = target_width / target_height
        
        if aspect_ratio > target_aspect:
            # Ancho excesivo, recortar
            new_width = int(image.height * target_aspect)
            left = (image.width - new_width) // 2
            image = image.crop((left, 0, left + new_width, image.height))
        else:
            # Alto excesivo, recortar
            new_height = int(image.width / target_aspect)
            top = (image.height - new_height) // 2
            image = image.crop((0, top, image.width, top + new_height))
        
        return image.resize((target_width, target_height), Image.Resampling.LANCZOS)
    
    def apply_hero_style(self, image: Image.Image, art_direction: str) -> Image.Image:
        """Aplica estilo hero corporativo."""
        # Aumentar contraste
        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(1.3)
        
        # Aplicar vignette
        image = self._add_vignette(image)
        
        # Aplicar color grading basado en dirección de arte
        if art_direction == "luxury":
            image = self._apply_warm_tone(image)
        elif art_direction == "tech":
            image = self._apply_cool_tone(image)
        elif art_direction == "swiss":
            image = self._apply_neutral_tone(image)
        
        return image
    
    def apply_editorial_style(self, image: Image.Image, art_direction: str) -> Image.Image:
        """Aplica estilo editorial premium."""
        # Reducir saturación ligeramente
        enhancer = ImageEnhance.Color(image)
        image = enhancer.enhance(0.85)
        
        # Aumentar nitidez
        enhancer = ImageEnhance.Sharpness(image)
        image = enhancer.enhance(1.4)
        
        # Aplicar efecto de luz suave
        image = self._add_soft_light(image)
        
        return image
    
    def apply_campaign_style(self, image: Image.Image, art_direction: str) -> Image.Image:
        """Aplica estilo campaña institucional."""
        # Aumentar vibrance
        enhancer = ImageEnhance.Color(image)
        image = enhancer.enhance(1.2)
        
        # Aumentar brillo
        enhancer = ImageEnhance.Brightness(image)
        image = enhancer.enhance(1.1)
        
        # Aplicar overlay sutil
        image = self._add_overlay(image, (0, 0, 0), 0.15)
        
        return image
    
    def apply_monochrome_filter(self, image: Image.Image) -> Image.Image:
        """Convierte a blanco y negro."""
        return image.convert("L")
    
    def apply_cinematic_filter(self, image: Image.Image) -> Image.Image:
        """Aplica color grading cinematográfico."""
        # Convertir a RGB si es necesario
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Aplicar color grading: tonos cálidos en highlights, fríos en shadows
        r, g, b = image.split()
        
        # Potenciar rojos/naranjas en highlights
        enhancer = ImageEnhance.Brightness(r)
        r = enhancer.enhance(1.15)
        
        # Reducir azules en highlights, potenciar en shadows
        enhancer = ImageEnhance.Brightness(b)
        b = enhancer.enhance(0.95)
        
        return Image.merge("RGB", (r, g, b))
    
    def _add_vignette(self, image: Image.Image) -> Image.Image:
        """Añade efecto vignette."""
        vignette = Image.new("RGB", image.size, (0, 0, 0))
        vignette_draw = ImageDraw.Draw(vignette)
        
        # Crear degradado radial manual
        for i in range(min(image.width, image.height) // 2):
            alpha = int(255 * (i / (min(image.width, image.height) // 2)) ** 2)
            vignette_draw.ellipse(
                [
                    (image.width // 2 - i, image.height // 2 - i),
                    (image.width // 2 + i, image.height // 2 + i)
                ],
                fill=(alpha, alpha, alpha)
            )
        
        vignette = vignette.filter(ImageFilter.GaussianBlur(radius=40))
        image.putalpha(255)
        vignette.putalpha(128)
        return Image.alpha_composite(image.convert("RGBA"), vignette.convert("RGBA")).convert("RGB")
    
    def _add_soft_light(self, image: Image.Image) -> Image.Image:
        """Añade overlay de luz suave."""
        soft_light = Image.new("RGB", image.size, (255, 255, 255))
        soft_light = soft_light.filter(ImageFilter.GaussianBlur(radius=30))
        return Image.blend(image, soft_light, 0.1)
    
    def _add_overlay(self, image: Image.Image, color: Tuple, opacity: float) -> Image.Image:
        """Añade overlay de color."""
        overlay = Image.new("RGB", image.size, color)
        return Image.blend(image, overlay, opacity)
    
    def _apply_warm_tone(self, image: Image.Image) -> Image.Image:
        """Aplica tono cálido (luxury)."""
        r, g, b = image.split()
        enhancer = ImageEnhance.Brightness(r)
        r = enhancer.enhance(1.1)
        enhancer = ImageEnhance.Brightness(b)
        b = enhancer.enhance(0.9)
        return Image.merge("RGB", (r, g, b))
    
    def _apply_cool_tone(self, image: Image.Image) -> Image.Image:
        """Aplica tono frío (tech)."""
        r, g, b = image.split()
        enhancer = ImageEnhance.Brightness(r)
        r = enhancer.enhance(0.95)
        enhancer = ImageEnhance.Brightness(b)
        b = enhancer.enhance(1.1)
        return Image.merge("RGB", (r, g, b))
    
    def _apply_neutral_tone(self, image: Image.Image) -> Image.Image:
        """Aplica tono neutral (swiss)."""
        # Reducir saturación para look más clean
        enhancer = ImageEnhance.Color(image)
        return enhancer.enhance(0.8)
    
    def generate_variant(
        self,
        project_num: int,
        interpretation: str,
        art_direction: str,
        color_palette: str,
        formats: List[str]
    ) -> Dict:
        """Genera una variante premium del proyecto."""
        
        print(f"\n🎨 Generando variante para Proyecto {project_num}")
        print(f"   Tipo: {interpretation}")
        print(f"   Arte: {art_direction}")
        print(f"   Colores: {color_palette}")
        
        # Cargar imagen original
        try:
            original_image = self.load_image(project_num)
            print(f"   ✓ Imagen cargada: {original_image.size}")
        except FileNotFoundError as e:
            print(f"   ✗ Error: {e}")
            return None
        
        results = {}
        
        for format_key in formats:
            print(f"   → Procesando formato: {format_key}...", end=" ")
            
            # Redimensionar
            image = original_image.copy()
            image = self.resize_for_format(image, format_key)
            
            # Aplicar estilo
            if interpretation == "hero":
                image = self.apply_hero_style(image, art_direction)
            elif interpretation == "editorial":
                image = self.apply_editorial_style(image, art_direction)
            elif interpretation == "campaign":
                image = self.apply_campaign_style(image, art_direction)
            
            # Aplicar paleta de color
            if color_palette == "monochrome":
                image = self.apply_monochrome_filter(image)
            elif color_palette == "cinematic":
                image = self.apply_cinematic_filter(image)
            
            # Guardar
            output_filename = f"project-{project_num}_{interpretation}_{art_direction}_{format_key}.png"
            output_path = OUTPUT_PATH / output_filename
            image.save(output_path, quality=95)
            
            results[format_key] = str(output_path)
            print(f"✓ ({FORMATS[format_key][0]}×{FORMATS[format_key][1]})")
        
        return {
            "project": project_num,
            "interpretation": interpretation,
            "art_direction": art_direction,
            "color_palette": color_palette,
            "formats": results,
            "status": "success"
        }
    
    def batch_generate(self, config: Dict) -> List[Dict]:
        """Genera múltiples variantes según configuración."""
        results = []
        
        for project_num in config.get("projects", range(1, 30)):
            for interpretation in config.get("interpretations", ["hero", "editorial"]):
                for art_direction in config.get("art_directions", ["minimalist"]):
                    for color_palette in config.get("color_palettes", ["original"]):
                        result = self.generate_variant(
                            project_num,
                            interpretation,
                            art_direction,
                            color_palette,
                            config.get("formats", ["desktop", "social"])
                        )
                        if result:
                            results.append(result)
        
        return results


def main():
    generator = PremiumVariantGenerator()
    
    # Configuración de ejemplo: generar variantes de los primeros 5 proyectos
    config = {
        "projects": [1, 2, 3],  # Proyectos a procesar
        "interpretations": ["hero", "editorial", "campaign"],  # Tipos de interpretación
        "art_directions": ["minimalist", "luxury", "tech"],    # Direcciones de arte
        "color_palettes": ["original", "monochrome", "cinematic"],  # Paletas de color
        "formats": ["desktop", "social", "instagram_portrait", "instagram_stories"],  # Formatos
    }
    
    print("🚀 Premium Image Variant Generator")
    print("=" * 60)
    print(f"Ruta de entrada: {PROJECT_IMAGES_PATH}")
    print(f"Ruta de salida: {OUTPUT_PATH}")
    print(f"Formatos disponibles: {list(FORMATS.keys())}")
    print("=" * 60)
    
    # Generar variantes
    results = generator.batch_generate(config)
    
    print("\n" + "=" * 60)
    print(f"✅ Proceso completado")
    print(f"📊 Total de variantes generadas: {len(results)}")
    print(f"📁 Guardadas en: {OUTPUT_PATH}")
    print("=" * 60)
    
    # Guardar reporte
    report_path = OUTPUT_PATH / "generation_report.json"
    with open(report_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"📋 Reporte guardado en: {report_path}")


if __name__ == "__main__":
    main()
