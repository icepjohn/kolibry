#!/bin/bash

# Dossier contenant les images (modifie si besoin)
SOURCE_DIR="images"

# Qualité WebP (modifie si besoin)
QUALITY=80

# Vérifie si cwebp est installé
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp n'est pas installé ! Installe-le avec : sudo apt install webp (Linux) ou brew install webp (Mac)"
    exit 1
fi

# Recherche et convertit toutes les images jpg/jpeg/png
find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | while read file; do
    output="${file%.*}.webp"
    if [ ! -f "$output" ]; then  # Vérifie si l'image WebP existe déjà
        echo "🔄 Conversion : $file → $output"
        cwebp -q $QUALITY "$file" -o "$output"
    else
        echo "✅ Déjà converti : $output"
    fi
done

echo "🚀 Conversion terminée ! Toutes les images sont en WebP."
