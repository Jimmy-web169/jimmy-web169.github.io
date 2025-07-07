#!/bin/bash

# 本機原始圖片來源目錄
LOCAL_DIR="/mnt/c/Users/user/Desktop/posts"
# 壓縮後的暫存 WebP 圖片輸出目錄
WEBP_DIR="/mnt/c/Users/user/Desktop/webp_posts"

# R2 的目標路徑（remote 名稱要跟 rclone config 中一致）
REMOTE_NAME="cloudflarer2"
REMOTE_PATH="static/img/posts"

# 確保來源資料夾存在
if [ ! -d "$LOCAL_DIR" ]; then
  echo "❌ 圖片目錄不存在：$LOCAL_DIR"
  exit 1
fi

# 清空暫存目錄，確保是新的
rm -rf "$WEBP_DIR"
mkdir -p "$WEBP_DIR"

echo "🖼️ 開始將圖片轉換為 WebP 格式..."

# 遍歷所有 jpg/png/jpeg 圖片並轉換為 webp
find "$LOCAL_DIR" -type f \( -iname "*.jpg" -o -iname "*.png" -o -iname "*.jpeg" \) | while read img; do
  filename=$(basename "$img")
  name="${filename%.*}"
  output="$WEBP_DIR/${name}.webp"
  cwebp -q 80 "$img" -o "$output" > /dev/null 2>&1

  if [ $? -eq 0 ]; then
    echo "✅ 已轉換: $filename → ${name}.webp"
  else
    echo "❌ 轉換失敗: $filename"
  fi
done

echo "🚀 開始上傳 WebP 圖片到 Cloudflare R2..."
rclone copy "$WEBP_DIR" "${REMOTE_NAME}:/${REMOTE_PATH}" -v

if [ $? -eq 0 ]; then
  echo "✅ 上傳完成！"
else
  echo "❌ 上傳失敗，請檢查錯誤訊息"
fi
