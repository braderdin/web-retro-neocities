import re
import requests
import random
from datetime import datetime, timezone, timedelta

def update_weather_and_readme():
    # Koordinat port ride
    locations = {
        'GENTING': {'lat': 3.42, 'lon': 101.79},
        'FRASER': {'lat': 3.71, 'lon': 101.73},
        'BETONG': {'lat': 5.76, 'lon': 101.03}
    }

    def get_condition(code):
        if code == 0: return 'Cerah ☀️'
        if 1 <= code <= 3: return 'Berawan 🌤️'
        if 45 <= code <= 48: return 'Berkabus 🌫️'
        if 51 <= code <= 67: return 'Hujan 🌧️'
        if 80 <= code <= 82: return 'Hujan Lebat ⛈️'
        return 'Tidak Tentu ❓'

    try:
        # Buka fail widget cuaca NJK
        with open("_includes/widgets/cuaca-port-ride.njk", "r", encoding="utf-8") as f:
            cuaca_html = f.read()

        betong_condition = "Tidak Tentu ❓" # Pembolehubah simpanan untuk Readme

        for loc, coords in locations.items():
            url = f"https://api.open-meteo.com/v1/forecast?latitude={coords['lat']}&longitude={coords['lon']}&current=weather_code"
            res = requests.get(url, timeout=10)
            res.raise_for_status() # Kebalkan kod: Berhenti jika API gagal
            data = res.json()
            condition = get_condition(data['current']['weather_code'])
            
            # Simpan status Betong khas untuk diletakkan di README nanti
            if loc == 'BETONG':
                betong_condition = condition
            
            # Guna Regex untuk tukar teks di dalam fail NJK
            pattern = rf'(<!-- {loc}_WEATHER -->)(.*?)(<!-- {loc}_WEATHER_END -->)'
            cuaca_html = re.sub(pattern, rf'\g<1>{condition}\g<3>', cuaca_html)

        # Simpan semula fail widget cuaca
        with open("_includes/widgets/cuaca-port-ride.njk", "w", encoding="utf-8") as f:
            f.write(cuaca_html)
        print("✅ Cuaca NJK berjaya dikemas kini!")

        # --- BAHAGIAN BAHARU: KEMAS KINI README.MD ---
        with open("README.md", "r", encoding="utf-8") as f:
            readme_text = f.read()

        # Dapatkan Waktu Malaysia (UTC+8)
        tz_my = timezone(timedelta(hours=8))
        masa_sekarang = datetime.now(tz_my).strftime("%d %b %Y, %I:%M %p")

        # Ganti masa di Readme
        pattern_masa = r'(<!-- MY_TIME -->)(.*?)(<!-- MY_TIME_END -->)'
        readme_text = re.sub(pattern_masa, rf'\g<1>{masa_sekarang}\g<3>', readme_text)

        # Ganti cuaca Betong di Readme
        pattern_betong_readme = r'(<!-- README_BETONG_WEATHER -->)(.*?)(<!-- README_BETONG_WEATHER_END -->)'
        readme_text = re.sub(pattern_betong_readme, rf'\g<1>{betong_condition}\g<3>', readme_text)

        # Simpan semula fail Readme
        with open("README.md", "w", encoding="utf-8") as f:
            f.write(readme_text)
        print(f"✅ README.md dikemas kini (Masa: {masa_sekarang} | Betong: {betong_condition})")

    except Exception as e:
        print(f"❌ Ralat sistem cuaca/readme: {e}")

def update_visitors():
    id_unik = "braderdin_garage_2026"
    url_api = f"https://api.moe-counter.ru/hit/{id_unik}/view.json"
    
    try:
        res = requests.get(url_api, timeout=10)
        res.raise_for_status()
        data = res.json()
        jumlah = data.get("value", 0)
        format_jumlah = f"{jumlah:04d}" # Formatkan jadi 0000

        # Buka fail widget pelawat
        with open("_includes/widgets/jumlah-pelawat.njk", "r", encoding="utf-8") as f:
            pelawat_html = f.read()

        # Guna Regex untuk tukar angka di antara tag rahsia
        pattern = r'(<!-- VISITOR_COUNT -->)(.*?)(<!-- VISITOR_COUNT_END -->)'
        pelawat_html = re.sub(pattern, rf'\g<1>{format_jumlah}\g<3>', pelawat_html)

        # Simpan semula fail widget pelawat
        with open("_includes/widgets/jumlah-pelawat.njk", "w", encoding="utf-8") as f:
            f.write(pelawat_html)
        print(f"✅ Kaunter Pelawat berjaya dikemas kini: {format_jumlah}")
    except Exception as e:
        print(f"❌ Ralat sistem pelawat: {e}")

# --- FUNGSI BAHARU: KEMAS KINI AVATAR RAWAK ---
def update_avatar():
    senarai_avatar = [
        "https://bit.ly/3QmPmqx",
        "https://i.imgur.com/My1N1mu.jpeg",
        "https://i.imgur.com/BznKqU1.jpeg",
        "https://i.imgur.com/GAMBAR_IMGUR_3.jpg"
    ]
    try:
        avatar_baru = random.choice(senarai_avatar)
        with open("_includes/components/profile.njk", "r", encoding="utf-8") as f:
            profil_html = f.read()
            
        pattern = r'(<img id="avatar-img" src=")(.*?)(")'
        profil_html = re.sub(pattern, rf'\g<1>{avatar_baru}\g<3>', profil_html)
        
        with open("_includes/components/profile.njk", "w", encoding="utf-8") as f:
            f.write(profil_html)
        print(f"✅ Avatar rawak berjaya dikemas kini ke: {avatar_baru}")
    except Exception as e:
        print(f"❌ Ralat sistem avatar: {e}")

if __name__ == "__main__":
    print("🤖 Memulakan proses kemas kini garaj BraderDin...")
    update_weather_and_readme()
    update_visitors()
    update_avatar()