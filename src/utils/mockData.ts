// src/utils/mockData.ts (Barcha inglizcha matnlar o'zbek tiliga o'girildi)

import type {ContactInfo, EditorialMember, Issue, Link} from "../types";

export const MOCK_ISSUES: Issue[] = [
    // Seriya nomlari O'zbek tilidagi ilmiy yo'nalishlarga moslashtirildi
    {
        id: 1,
        year: 2025,
        number: 'Nº5',
        series: '1-seriya', // 1 series -> 1-seriya
        publishedDate: '30 Sentyabr 2025', // 30 September 2025 -> 30 Sentyabr 2025
        seriesName: "Tabiiy-texnika fanlari, Ijtimoiy-iqtisodiy fanlar, Filologiya fanlari", // Tarjima
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 2,
        year: 2025,
        number: 'Nº4',
        series: '2-seriya', // 2 series -> 2-seriya
        publishedDate: '27 Iyun 2025', // 27 June 2025 -> 27 Iyun 2025
        seriesName: 'Pedagogika fanlari, Psixologiya fanlari', // Tarjima
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 3,
        year: 2025,
        number: 'Nº3',
        series: '1-seriya',
        publishedDate: '15 May 2025', // 15 May 2025 -> 15 May 2025
        seriesName: 'Tabiiy-texnika fanlari, Ijtimoiy-iqtisodiy fanlar', // Tarjima
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 4,
        year: 2025,
        number: 'Nº5',
        series: '1-seriya',
        publishedDate: '30 Sentyabr 2025',
        seriesName: "Tabiiy-texnika fanlari, Ijtimoiy-iqtisodiy fanlar, Filologiya fanlari",
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 5,
        year: 2025,
        number: 'Nº4',
        series: '2-seriya',
        publishedDate: '27 Iyun 2025',
        seriesName: 'Pedagogika fanlari, Psixologiya fanlari',
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 6,
        year: 2025,
        number: 'Nº3',
        series: '1-seriya',
        publishedDate: '15 May 2025',
        seriesName: 'Tabiiy-texnika fanlari, Ijtimoiy-iqtisodiy fanlar',
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 7,
        year: 2025,
        number: 'Nº5',
        series: '1-seriya',
        publishedDate: '30 Sentyabr 2025',
        seriesName: "Tabiiy-texnika fanlari, Ijtimoiy-iqtisodiy fanlar, Filologiya fanlari",
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 8,
        year: 2025,
        number: 'Nº4',
        series: '2-seriya',
        publishedDate: '27 Iyun 2025',
        seriesName: 'Pedagogika fanlari, Psixologiya fanlari',
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
];

export const USEFUL_LINKS: Link[] = [
    { name: 'Urganch Davlat Pedagogika Instituti', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#' },
    { name: 'Oliy Attestatsiya Komissiyasi (OAK)', logo: 'data:image/jpeg;base64,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', url: 'https://www.facebook.com/eduuzofficial/mentions/' },
    { name: 'O‘zbekiston Respublikasi Fanlar Akademiyasi', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy-0XMaj353sFNxRJpaNgabwc3Qv9q6WR_6w&s', url: 'https://www.academy.uz/' },
    { name: 'O‘zbekiston ilmiy tadqiqotlar milliy bazasi', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHrXzgAL6pr7VlBL5X7OErYci-_UNhscHiZQ&s', url: 'https://scienceweb.uz/?trk=public_post-text' },
    { name: 'Oliy Ta\'lim Fan va Innovatsiyalar Vazirligi', logo: 'https://play-lh.googleusercontent.com/aODwMHBqeXILyUFmV2BGc3JVVk_S4E5dX_snaVXORl8kDW2hiaT4p_6T3nNAVBzh0UgJ', url: 'https://gov.uz/edu'},
    { name: 'Respublika Oliy Ta’lim Kengashi', logo: 'https://sokin.moy.su/_ph/170/835330255.jpg', url: 'http://uzrotk.uz/uz/asosiy/'},
];

export const CONTACT_INFO: ContactInfo = {
    phone: '+998970909527',
    email: 'uktamjon@urdu.uz',
    address: "Urganch shahri, Al - Хorazmiy ko‘chasi, 110 - uy., indeks 220100, O‘zbekiston", // Tarjima
};

// Bu qismdagi rollar/lavozimlar ham tarjima qilinadi
export const EDITORIAL_MEMBERS: EditorialMember[] = [
    { id: 0, fullName: 'Xodjaniyazov Sardor Umarovich', degree: 'p.f.d. (DSc), professor, URDU rektor v.v.b.', city: '(Urganch)', role: 'Editor-in-Chief' }, // Editor-in-Chief -> Bosh muharrir
    { id: 1, fullName: 'Bekmuratova P.S.', degree: 'Ph.D., doc.', city: '(Urganch)', role: "Executive Secretary" }, // Executive Secretary -> Mas'ul kotib
    { id: 2, fullName: 'Ismoilov Shukurullox Xabibulloh o‘g‘li', degree: 'f-m., f-n., dotsent', city: '(Urganch)', role: "Member" }, // Member -> A'zo
    { id: 3, fullName: 'Avazov Erkin Sherimmatovich', degree: 'dotsent', city: '(Urganch)', role: "Member" },
    { id: 4, fullName: 'Allamov Oybek To‘raboyevich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: "Member" },
    { id: 5, fullName: 'Avezov Nodirbek Egamberganovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: "Member" },
    { id: 6, fullName: 'Ismoilov Shavkat Ko‘ziboyevich', degree: 'f-m., f-n., dotsent', city: '(Urganch)', role: "Member" },
    { id: 7, fullName: 'Matyokubov O‘tkir Karimovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: "Member" },
    { id: 8, fullName: 'Xo‘jayev Otabek Qadamboyevich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: "Member" },
    { id: 9, fullName: 'Xudayberganov Temur Rustamovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: "Member" },
    { id: 10, fullName: 'Setmetov Ne’matjon Urunboyevich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: "Member" },
    { id: 11, fullName: 'Raximbaev Xikmat Jumanazarovich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: "Member" },
    { id: 12, fullName: 'Samandarov Bunyod G‘ayratovich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: "Member" },
    { id: 13, fullName: 'Yusupov Firnafas', degree: 't.f.n., dotsent', city: '(Urganch)', role: "Member" },
    { id: 14, fullName: 'Xalmuratov Omonboy Utamuratovich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: "Member" },
    { id: 15, fullName: 'Madaminov Uktamjon Ataxanovich', degree: 'p.f.f.d. (PhD)', city: '(Urganch)', role: "Member" },
    { id: 16, fullName: 'Madatov Xabibulla Axmedovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: "Member" },
    { id: 17, fullName: 'Mengliyev Davlatyor Baxtiyarovich', degree: 't.f.f.d. (PhD)', city: '(Seoul)', role: "Member" },
    // ... yana 70 ga yaqin a'zo
];