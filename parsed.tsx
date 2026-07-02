
    
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffffff] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-between items-center w-full px-[24px] max-w-[1200px] mx-auto h-20">
            <div className="flex items-center gap-2">
                <span className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]  font-extrabold text-[#006591] tracking-tight">MicroJourney
                    AR</span>
            </div>
            <div className="hidden md:flex items-center gap-[40px]">
                <a className="text-[#006e2f] border-b-4 border-[#006e2f] pb-2 font-bold text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)] "
                    href="LandingPage.html">Beranda</a>
                <a className="text-[#3e4850] hover:text-[#006591] pb-2 transition-colors text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)] "
                    href="../PerjalananBelajar/PerjalananBelajarHome.html">Perjalanan Belajar</a>
                <a className="text-[#3e4850] hover:text-[#006591] pb-2 transition-colors text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)] "
                    href="../Materi/Materi.html">Materi</a>
                <a className="text-[#3e4850] hover:text-[#006591] pb-2 transition-colors text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)] " href="../E-LKPD/Dashboard-LKPD.html">E-LKPD</a>
                <a className="text-[#3e4850] hover:text-[#006591] pb-2 transition-colors text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)] " href="../RaporGuru/Dashboard-Guru.html">Rapor Guru</a>
            </div>
            <div className="flex items-center gap-[24px]">
                <button
                    className="material-symbols-outlined p-2 text-[#3e4850] hover:bg-[#f2f4f6] rounded-lg transition-all active:scale-95">notifications</button>
                <button
                    className="material-symbols-outlined p-2 text-[#3e4850] hover:bg-[#f2f4f6] rounded-lg transition-all active:scale-95">emoji_events</button>
                <div
                    className="w-10 h-10 rounded-full bg-[#0ea5e9] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    <img alt="Student profile avatar" className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvUqWyM_7rY7ANAaEfYv6B4jyTH3G3hvAYpGo5q_CAjAYma7uqMlfqjCmjaPlEe-P0xaHWmsMPG-bxkx4xHR38EKxofwu2Rc0OSBbvtw6NMNX2K0sZVb4NoQn8StgLYrazHppDC9-Qgd9_VjaNxnDr6AJo7mEcpYOtYPBM8hxzmUy9_5X55zHUiHonXWNmGGPoz0vMBue3y5Nlf-um1XvD9YQmS5junlUJirwvzmk5pkTmVXGzgL_al7jFBFqvcPIIUXgCWyeXdA" />
                </div>
            </div>
        </nav>
    </header>
    <main className="mt-20">
        
        <section
            className="relative min-h-[870px] flex items-center overflow-hidden bg-gradient-to-br from-[#ffffff] to-[#c9e6ff]/20">
            <div
                className="max-w-container-max mx-auto px-[24px] grid grid-cols-1 lg:grid-cols-12 gap-[40px] items-center relative z-10">
                <div className="lg:col-span-6 space-y-md">
                    <span
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#6bff8f] text-[#007432] text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)] ">
                        <span className="material-symbols-outlined text-[18px]">explore</span> Misi Baru Tersedia!
                    </span>
                    <h1 className="text-[48px] leading-[56px] tracking-[-0.02em] font-extrabold font-[family-name:var(--font-plus-jakarta)]  text-[#191c1e] leading-tight">
                        Mulai <span className="text-[#006591]">Petualangan</span> Mikroplastikmu!
                    </h1>
                    <p className="text-[18px] leading-[28px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850] max-w-[64px]">
                        Selami dunia yang tak terlihat di sekitarmu. Temukan bagaimana partikel kecil mengubah ekosistem
                        kita melalui teknologi Augmented Reality yang memukau.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-[24px] pt-4">
                        <button
                            className="h-12 px-8 bg-[#006591] text-[#ffffff] rounded-xl text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  shadow-lg shadow-[#006591]/20 hover:scale-105 transition-transform active:scale-95 flex items-center justify-center gap-2">
                            Mulai Belajar Sekarang <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                        <button
                            className="h-12 px-8 border-2 border-[#006e2f] text-[#006e2f] rounded-xl text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  hover:bg-[#006e2f]/5 transition-colors flex items-center justify-center gap-2">
                            Lihat Demo AR <span className="material-symbols-outlined">play_circle</span>
                        </button>
                    </div>
                </div>
                <div className="lg:col-span-6 relative">
                    <div
                        className="relative w-full aspect-square md:aspect-video lg:aspect-square flex items-center justify-center">
                        
                        <div className="absolute inset-0 bg-[#006e2f]/5 rounded-full scale-110 blur-3xl"></div>
                        <img alt="Petualangan AR" className="w-full h-full object-contain z-10 animate-float rounded-3xl"
                            data-alt="A modern and cheerful 3D digital illustration of a diverse teenage student excitedly using a futuristic translucent tablet to see floating 3D microplastic models in a bright sunny classroom. The visual style is vibrant and approachable with a sky blue and leaf green color palette, featuring soft rounded shapes and energetic high-key lighting to appeal to a younger audience."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDu8MT8Kl3twc8c-SpOs1J12T3-QANAeqhSe5B6kwiPjP4hezUKiqDCjJQMbex8izzEG7s-hjtt9Z6XYOs-94zEZe7RH7eX5kWtDKor7xYqjLfLhCavIQ836xRPGyGVlN30bNgwmW1vN98eDA4alT65brZ7LBjBiLNRJPhnke1G1FqypNBrtZXV2N8sqVTZTnZwzJ1o1WRLAg8_x8jMlUz1RAK2KN7nAVm5TiqtQ2xXx3NqzTf66oYxSW_v_ktuWUfyf9Taz3_JTA" />
                        
                        <div className="absolute top-10 right-0 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl z-20 animate-bounce"
                            style="animation-duration: 3s;">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#785a00] text-4xl"
                                    style="font-variation-settings: 'FILL' 1;">stars</span>
                                <div>
                                    <p className="text-[12px] leading-[16px] font-medium font-[family-name:var(--font-inter)]  text-[#3e4850]">Lencana Baru</p>
                                    <p className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  font-bold">Penjaga Sungai</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#006591]/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#006e2f]/10 rounded-full blur-3xl"></div>
        </section>
        
        <section className="py-xl bg-white">
            <div className="max-w-container-max mx-auto px-[24px]">
                <div className="text-center max-w-3xl mx-auto mb-[64px]">
                    <h2 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-plus-jakarta)]  mb-4">Cara Belajar yang Lebih <span
                            className="text-[#006e2f]">Seru</span></h2>
                    <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Kami menggabungkan metode pembelajaran
                        VAK (Visual, Auditory, Kinesthetic) agar setiap petualanganmu meninggalkan kesan yang mendalam.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
                    
                    <div
                        className="bento-card p-[24px] rounded-[24px] bg-[#f2f4f6] border border-[#bec8d2]/30 flex flex-col gap-[12px]">
                        <div
                            className="w-16 h-16 rounded-2xl bg-[#0ea5e9] flex items-center justify-center text-[#003751]">
                            <span className="material-symbols-outlined text-3xl">visibility</span>
                        </div>
                        <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)] ">Visual</h3>
                        <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Lihat partikel mikroplastik dalam
                            resolusi tinggi yang seolah-olah nyata berada di depan matamu.</p>
                        <div className="mt-auto pt-[24px] overflow-hidden rounded-xl">
                            <img alt="Visual Learning" className="w-full h-32 object-cover"
                                data-alt="Close up high-tech visualization of microscopic plastic fibers glowing with neon blue highlights against a dark organic background, presented as an interactive educational AR display. The style is clean, modern, and high-contrast, emphasizing clarity and scientific discovery for students."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATyH4L-6f6DZ6yvhAfB16A27o3YN5uglyxoW6yIR22w26Rx4OY0EMVuOCer3medrrk6yOMJsA89JgzGw-ZeoKirbIwvYivlomDM8B810hLKOZvkXaTum3fgfTRllg3HhFVbMpDypdBLzxNfQRmTYxLRpN7fBCOfpDB0mPXzn7THhsL_6JQKPWUNwry1AgRwXo4L3R-phxEVYRgk__7KFrsY3is9aPYrPeCjlWLeB4TQMjKIH5uuwN_VuaEfOl5JZRt7B_yN3kbBw" />
                        </div>
                    </div>
                    
                    <div
                        className="bento-card p-[24px] rounded-[24px] bg-[#f2f4f6] border border-[#bec8d2]/30 flex flex-col gap-[12px]">
                        <div
                            className="w-16 h-16 rounded-2xl bg-[#ffdf9a] flex items-center justify-center text-[#251a00]">
                            <span className="material-symbols-outlined text-3xl">headphones</span>
                        </div>
                        <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)] ">Auditory</h3>
                        <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Dengarkan narasi petualangan
                            interaktif yang menuntunmu memahami setiap detail ekosistem.</p>
                        <div className="mt-auto pt-[24px] overflow-hidden rounded-xl">
                            <img alt="Auditory Learning" className="w-full h-32 object-cover"
                                data-alt="A professional high-quality photo of bright yellow studio headphones resting on a clean white desk next to a colorful scientific journal. The lighting is bright and cheerful, reinforcing a modern educational atmosphere that focuses on audio-visual learning for teenagers."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY7A11o6_1qzCJskYmPtZ2IBgY7pN7b_MKHJCVANFE5z_EF4O5VQoT2euARwXfbJimeET2L2zlBcEBGDyadGfY-IN7FFXRddGj_gN1I3jBHt3AFWpj5fFnslPchSeyUw9rWqB7KRqjeRXj3S3HBOWAgfGIlc6UQTJL3A6L_mNv9gCK6b60PirY7UptEHDY8W4_Gv_CEtlEBVQDS7m5JAGsgRos0VL3ZAEPeJy3NlIKs6J5taJ_TQeXMTwH8gtfPTWoYI0ZuKiY5Q" />
                        </div>
                    </div>
                    
                    <div
                        className="bento-card p-[24px] rounded-[24px] bg-[#f2f4f6] border border-[#bec8d2]/30 flex flex-col gap-[12px]">
                        <div
                            className="w-16 h-16 rounded-2xl bg-[#6bff8f] flex items-center justify-center text-[#007432]">
                            <span className="material-symbols-outlined text-3xl">touch_app</span>
                        </div>
                        <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)] ">Kinesthetic</h3>
                        <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Interaksi langsung dengan objek AR,
                            geser, perbesar, dan kumpulkan sampel secara virtual.</p>
                        <div className="mt-auto pt-[24px] overflow-hidden rounded-xl">
                            <img alt="Kinesthetic Learning" className="w-full h-32 object-cover"
                                data-alt="An energetic action shot of a student's hands interacting with a virtual 3D water molecule floating in the air, with blurred green outdoor foliage in the background. The scene captures the tactile feel of kinetic learning through mobile AR technology, using bright daylight and vibrant colors."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhwT9YBpI_t1m7KzaK0dsnL90OjOSfEGzwJvscaiylMV8yTq5p0kQTCI6bePT14FVeeJhyaBSIZXCBz99WA1pmPPfVONdF6IOX4NeDYNOyRaESJrC5JA762q-Cf_CFRftxVTaUvpNm2NtNyn2pP2qpfqzqJZiwjvnZwmfoQG6ie3KazKIhzT7bp2vyOnHU_B8aZ7iMUf-5U0oq91wh6pTsiCxkcE0xRtXby9sgGW0HS8CUojtGdLbVBngt_87kJhlR65FQRLi_wA" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-xl bg-[#f2f4f6]">
            <div className="max-w-container-max mx-auto px-[24px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#006591]/10 rounded-[32px] transform -rotate-3"></div>
                            <img alt="Cara Kerja AR" className="relative z-10 w-full rounded-[24px] shadow-2xl"
                                data-alt="A student outdoors in a lush green park holding a smartphone horizontally, scanning a leaf with an AR camera overlay that shows digital scanning lines and data pop-ups. The environment is sun-drenched and peaceful, with a clear focus on the intersection of nature and advanced educational technology."
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdnia95Pt0jxkJgIWwd12VwohQlo8DZ78ED8OZm9SVquvdWm4UM3gi6uaVW0-NoBmJnnas3rzJRWuYBM6nZ2R25WKSmXXczRHWfonoVVlwc5d1ADxWX_4L8YVd2liizJxaK89opi1BD3PfMyciMHLytVrL8HjaZXdrwIXTXx0wLBWfJd_jX164ozdRZdeAJpEP58FPPTmtx4LYv8k3iavqpkUxgajb93RmKG7ZCvpfdz8KfQHFTTaK-7FOPQ4PL8VnyAzecDIKFg" />
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 space-y-lg">
                        <h2 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-plus-jakarta)] ">Tiga Langkah <span
                                className="text-[#006591]">Eksplorasi</span></h2>
                        <div className="space-y-md">
                            
                            <div className="flex gap-[24px] group">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#006591] group-hover:bg-[#006591] group-hover:text-white transition-colors duration-300">
                                    1</div>
                                <div>
                                    <h4 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)] text-[20px] mb-1">Scan Lingkunganmu</h4>
                                    <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Arahkan kameramu ke
                                        objek di sekitar—air, tanah, atau bahkan produk harianmu.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-[24px] group">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#006591] group-hover:bg-[#006591] group-hover:text-white transition-colors duration-300">
                                    2</div>
                                <div>
                                    <h4 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)] text-[20px] mb-1">Visualisasi Mikro</h4>
                                    <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Lihat keajaiban AR saat
                                        partikel mikroplastik muncul dan teridentifikasi secara otomatis.</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-[24px] group">
                                <div
                                    className="flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-[#006591] group-hover:bg-[#006591] group-hover:text-white transition-colors duration-300">
                                    3</div>
                                <div>
                                    <h4 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)] text-[20px] mb-1">Observasi &amp; Analisis</h4>
                                    <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Pelajari dampaknya dan
                                        selesaikan misi untuk mendapatkan poin pengetahuan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-xl bg-white overflow-hidden">
            <div className="max-w-container-max mx-auto px-[24px]">
                <h2 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-plus-jakarta)]  text-center mb-[64px]">Fitur Unggulan Kamu</h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px]">
                    
                    <div
                        className="md:col-span-8 group relative rounded-[32px] overflow-hidden bg-[#006591] aspect-video md:aspect-auto h-[400px]">
                        <img alt="AR Technology"
                            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700"
                            data-alt="A stunning immersive landscape of a digital coral reef teeming with vibrant glowing micro-particles, viewed through an AR interface with data labels and health meters. The visual style is magical and educational, using deep blues and fluorescent greens to create a sense of wonder for adolescent explorers."
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrt_7rcJ-0GVieY-RTZrIsykmkX7RUFKgQWvzoXezgAhxKxyUygKVmRrTIFI4XbBAHzLtzcdAuChZo0ecFVn9YDaQOrs3NqwpUerzJxqOuTaMdnUfCY2-K8BWRDVc02HOqq0_X4_zwCi2fXM13RiUr8r7MVQ0KijWoZs_wny1JXZGINUsqQ0M-DCu6H3SxZcRvrvcxErKymkm1muMUs_0lqnQDwzy2Kkjrm2IomkqN7fpyKxZU8lRhfw5almQvZOefD9koKwZAA" />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-[#006591]/90 to-transparent flex flex-col justify-end p-[40px]">
                            <span
                                className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-white mb-[24px]">
                                <span className="material-symbols-outlined">biotech</span>
                            </span>
                            <h3 className="text-[32px] leading-[40px] font-bold font-[family-name:var(--font-plus-jakarta)] text-white mb-2">Teknologi AR Tercanggih</h3>
                            <p className="text-white/80 text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  max-w-[40px]">Deteksi partikel polutan secara
                                real-time dengan akurasi tinggi menggunakan sensor canggih perangkatmu.</p>
                        </div>
                    </div>
                    
                    <div
                        className="md:col-span-4 bg-[#c39400] rounded-[32px] p-[40px] flex flex-col text-[#423000] hover:shadow-xl transition-all">
                        <span
                            className="w-12 h-12 rounded-xl bg-[#423000]/10 flex items-center justify-center mb-[24px]">
                            <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                        </span>
                        <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]  mb-2">Misi Seru Harian</h3>
                        <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  opacity-90 mb-[40px]">Tantang dirimu dengan misi penyelamatan
                            lingkungan di setiap level petualangan.</p>
                        <div className="mt-auto bg-white/30 rounded-2xl p-4 flex items-center justify-between">
                            <span className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)] ">Misi Hari Ini</span>
                            <span className="bg-white px-3 py-1 rounded-full text-xs font-bold">2/5</span>
                        </div>
                    </div>
                    
                    <div
                        className="md:col-span-4 bg-[#6bff8f] rounded-[32px] p-[40px] flex flex-col text-[#007432] order-4 md:order-3">
                        <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]  mb-4">Lencana Digital</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                                <span className="material-symbols-outlined text-4xl mb-1">eco</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Eco Warrior</span>
                            </div>
                            <div
                                className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center opacity-40">
                                <span className="material-symbols-outlined text-4xl mb-1">water_drop</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Water Hero</span>
                            </div>
                            <div
                                className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                                <span className="material-symbols-outlined text-4xl mb-1">workspace_premium</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Master AR</span>
                            </div>
                            <div
                                className="aspect-square bg-white/40 rounded-2xl flex flex-col items-center justify-center p-2 text-center">
                                <span className="material-symbols-outlined text-4xl mb-1">science</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider">Scientist</span>
                            </div>
                        </div>
                        <p className="mt-md text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#007432]/80">Koleksi semua lencana
                            langka untuk naik ke level Grand Explorer!</p>
                    </div>
                    
                    <div
                        className="md:col-span-8 bg-[#e6e8ea] rounded-[32px] p-[40px] flex flex-col md:flex-row gap-[40px] items-center order-3 md:order-4">
                        <div className="flex-1">
                            <h3 className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]  mb-2">Pantau Progress Belajarmu</h3>
                            <p className="text-[16px] leading-[24px] font-normal font-[family-name:var(--font-inter)]  text-[#3e4850]">Lihat seberapa jauh kamu sudah
                                melangkah dan bandingkan skor petualanganmu dengan teman sekolah.</p>
                            <div className="mt-md h-3 w-full bg-[#bec8d2]/30 rounded-full overflow-hidden">
                                <div className="h-full bg-[#006e2f] w-3/4 rounded-full"></div>
                            </div>
                            <div className="mt-2 flex justify-between text-[12px] font-bold text-[#3e4850]">
                                <span>Level 12: Junior Explorer</span>
                                <span>750 / 1000 XP</span>
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex -space-x-4">
                            <div
                                className="w-14 h-14 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center overflow-hidden">
                                <img alt="User 1" className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuCge-rPrht317EmEdOWmp-YVm8hMagtzGV2y4J3Q8kV_PCQ5tk044yB8bzqM4VYYb1oL8YUar2SLhIuNVi3_oDIlxXyH1YN7dRwrCLGq81VS78nNe3hFh4QuVbvCwuT9rhcHF-RZgLCMhNChP4OpyMmSYzwBk6nzjisn3NMe6YXuSqzey6d5Y3MfyG9YuC_PkK8xZWxPyqfGmap9kmEyIQCOTj6FPe7ACfzS0kRd9CO8H8adumYKrCmQMJivQl6OcGBWn5bIqeQ" />
                            </div>
                            <div
                                className="w-14 h-14 rounded-full border-4 border-white bg-green-100 flex items-center justify-center overflow-hidden">
                                <img alt="User 2" className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-QodboRdigx2a5zasNfzgaEWVbpgdCBxXTswqBr7YXOfhcfFDUwYXmCJhJ8R3dO2249W6lSkjLq3CorB7MQM9HcexjNru40QSPf2VX_hNDE-Kw64Ca7UxtSAjnt8r9OCkB1RnWglHzGc6jZ9MVszU6S4KyBdlUKr0xIxZsTkSjnn53kH17k7FC2BPlEILe9n3Ruv4qH_mDNRWWo8xuQLIhA23pu_ZK2zoqsB3Y-N4r_ESRlR7XTutR979G8oiuzJJpYXZPl2Ng" />
                            </div>
                            <div
                                className="w-14 h-14 rounded-full border-4 border-white bg-yellow-100 flex items-center justify-center overflow-hidden">
                                <img alt="User 3" className="w-full h-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXYaAtF23ZJAqlrARuHO5BCfpToON0j0Q3URAbI5YxF6YKuVG6Tx_4feyyyloS0O_YV3NBB2yhkcyXfZXFd98-P1QE_GTecRN_R8-aBb5zBPnKwpH_syLUcZpG0gvJSZJTEFJ4r7LkdEZA86C_HxoeNbiVwrLgRGac_RtGg6hiCMA6_vq_tKj_5f9ieCcTZXX3iCuSiI83MjidYvIO6EWOhnTN5vx5pjf9Mw53GP5CGugLTNPWtIiGbNZgEKfv2kt6J9tD6BT9CA" />
                            </div>
                            <div
                                className="w-14 h-14 rounded-full border-4 border-white bg-[#eceef0] flex items-center justify-center font-bold text-xs">
                                +12</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-xl relative overflow-hidden">
            <div className="max-w-container-max mx-auto px-[24px] relative z-10">
                <div
                    className="bg-[#006591] rounded-[40px] p-[40px] md:p-xl text-center text-[#ffffff] shadow-2xl relative overflow-hidden">
                    <div
                        className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl">
                    </div>
                    <div
                        className="absolute bottom-0 left-0 w-64 h-64 bg-[#006e2f]/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl">
                    </div>
                    <h2 className="text-[48px] leading-[56px] tracking-[-0.02em] font-extrabold font-[family-name:var(--font-plus-jakarta)]  mb-4 text-white">Siap Menjadi Pahlawan <span
                            className="text-[#6bff8f]">Lingkungan?</span></h2>
                    <p className="text-[18px] leading-[28px] font-normal font-[family-name:var(--font-inter)]  text-white/90 mb-[64px] max-w-2xl mx-auto">Gabung bersama ribuan
                        pelajar lainnya dan jadilah bagian dari perubahan besar untuk bumi kita.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-[24px]">
                        <button
                            className="h-16 px-12 bg-white text-[#006591] rounded-2xl text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]  hover:scale-105 transition-transform active:scale-95 shadow-xl">
                            Mulai Belajar
                        </button>
                        <button
                            className="h-16 px-12 bg-[#0ea5e9] text-[#003751] rounded-2xl text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]  border border-white/20 hover:bg-white/10 transition-colors">
                            Bantuan Guru
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <footer
        className="bg-[#eceef0] dark:bg-[#e0e3e5] border-t border-[#bec8d2] dark:border-[#6e7881]">
        <div
            className="w-full py-[64px] px-[24px] flex flex-col md:flex-row justify-between items-center gap-[24px] max-w-[1200px] mx-auto">
            <div className="flex flex-col items-center md:items-start gap-4">
                <span
                    className="text-[24px] leading-[32px] font-semibold font-[family-name:var(--font-plus-jakarta)]  font-bold text-[#191c1e] dark:text-[#eff1f3]">MicroJourney
                    AR</span>
                <p
                    className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  text-[#3e4850] dark:text-[#bec8d2] text-center md:text-left">
                    © 2024 MicroJourney AR. Petualangan Sains untuk Penjelajah Muda.
                </p>
            </div>
            <div className="flex gap-[40px] flex-wrap justify-center">
                <a className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  text-[#3e4850] dark:text-[#bec8d2] hover:text-[#006e2f] dark:hover:text-[#6bff8f] transition-colors"
                    href="#">Tentang Kami</a>
                <a className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  text-[#3e4850] dark:text-[#bec8d2] hover:text-[#006e2f] dark:hover:text-[#6bff8f] transition-colors"
                    href="#">Bantuan</a>
                <a className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  text-[#3e4850] dark:text-[#bec8d2] hover:text-[#006e2f] dark:hover:text-[#6bff8f] transition-colors"
                    href="#">Kebijakan Privasi</a>
                <a className="text-[14px] leading-[20px] tracking-[0.01em] font-semibold font-[family-name:var(--font-inter)]  text-[#3e4850] dark:text-[#bec8d2] hover:text-[#006e2f] dark:hover:text-[#6bff8f] transition-colors"
                    href="#">Panduan Guru</a>
            </div>
            <div className="flex gap-[24px]">
                <a className="w-10 h-10 rounded-full bg-[#e6e8ea] flex items-center justify-center text-[#3e4850] hover:bg-[#006591] hover:text-white transition-all"
                    href="#">
                    <span className="material-symbols-outlined">language</span>
                </a>
                <a className="w-10 h-10 rounded-full bg-[#e6e8ea] flex items-center justify-center text-[#3e4850] hover:bg-[#006591] hover:text-white transition-all"
                    href="#">
                    <span className="material-symbols-outlined">forum</span>
                </a>
            </div>
        </div>
    </footer>
    <script>
        // Simple scroll effect for navbar
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 20) {
                header.classList.add('shadow-md');
            } else {
                header.classList.remove('shadow-md');
            }
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.bento-card').forEach(el => {
            el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
            observer.observe(el);
        });
    </script>

    <div style="position: fixed; bottom: 20px; right: 20px; display: flex; gap: 10px; z-index: 9999;">
        <a href="..\PerjalananBelajar\PerjalananBelajarHome.html" style="background: #006591; color: white; padding: 10px 20px; border-radius: 8px; font-weight: bold; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Selanjutnya</a>
    </div>
