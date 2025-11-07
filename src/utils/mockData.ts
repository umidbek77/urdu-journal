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
    { name: 'Urganch Davlat Pedagogika Instituti', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#' }, // Tarjima
    { name: 'Oliy Attestatsiya Komissiyasi (OAK)', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#'}, // Tarjima
    { name: 'O‘zbekiston Respublikasi Fanlar Akademiyasi', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#'}, // Tarjima
    { name: 'O‘zbekiston ilmiy tadqiqotlar milliy bazasi', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#'}, // Tarjima
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