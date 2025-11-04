// src/utils/mockData.ts


import type {ContactInfo, EditorialMember, Issue, Link} from "../types";

export const MOCK_ISSUES: Issue[] = [
    // ... (Avval berilgan Issue datalari shu yerda)
    {
        id: 1,
        year: 2025,
        number: 'Nº5',
        series: '1 series',
        publishedDate: '30 September 2025',
        seriesName: 'Natural-technical sciences, Social and economic sciences, Philological sciences',
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg', // Mock rasm yo'li
    },
    {
        id: 2,
        year: 2025,
        number: 'Nº4',
        series: '2 series',
        publishedDate: '27 June 2025',
        seriesName: 'Pedagogical sciences, Psychological sciences',
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
    {
        id: 3,
        year: 2025,
        number: 'Nº3',
        series: '1 series',
        publishedDate: '15 May 2025',
        seriesName: 'Natural-technical sciences, Social and economic sciences',
        coverImage: 'https://talimtelekanali.uz/media/uploads/2025/04/08/image-20250408110051-2.jpeg',
    },
];

export const USEFUL_LINKS: Link[] = [
    { name: 'Nukus State Pedagogical Institute named after Ajiniyaz', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: 'https://ndpi.uz/' },
    { name: 'Supreme Attestation Commission', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#'},
    { name: 'Academy of sciences of the Republic of Uzbekistan', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#'},
    { name: 'National database of scientific research of Uzbekistan', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: '#'},
];

export const CONTACT_INFO: ContactInfo = {
    phone: '+998(93) 304-33-43',
    email: 'fanvajamiyat@mail.ru',
    address: 'Nukus city, F. Seytov street without number, index 230105',
};

export const EDITORIAL_MEMBERS: EditorialMember[] = [
    // Sayt rasmidagi ma'lumotlar asosida
    { id: 0, fullName: 'Xodjaniyazov Sardor Umarovich', degree: 'p.f.d. (DSc), professor, URDU rektor v.v.b.', city: '(Urganch)', role: 'Editor-in-Chief' },
    { id: 1, fullName: 'Bekmuratova P.S.', degree: 'Ph.D., doc.', city: '(Urganch)', role: 'Executive Secretary' },
    { id: 2, fullName: 'Ismoilov Shukurullox Xabibulloh o‘g‘li', degree: 'f-m., f-n., dotsent', city: '(Urganch)', role: 'Member' },
    { id: 3, fullName: 'Avazov Erkin Sherimmatovich', degree: 'dotsent', city: '(Urganch)', role: 'Member' },
    { id: 4, fullName: 'Allamov Oybek To‘raboyevich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: 'Member' },
    { id: 5, fullName: 'Avezov Nodirbek Egamberganovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: 'Member' },
    { id: 6, fullName: 'Ismoilov Shavkat Ko‘ziboyevich', degree: 'f-m., f-n., dotsent', city: '(Urganch)', role: 'Member' },
    { id: 7, fullName: 'Matyokubov O‘tkir Karimovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: 'Member' },
    { id: 8, fullName: 'Xo‘jayev Otabek Qadamboyevich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: 'Member' },
    { id: 9, fullName: 'Xudayberganov Temur Rustamovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: 'Member' },
    { id: 10, fullName: 'Setmetov Ne’matjon Urunboyevich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: 'Member' },
    { id: 11, fullName: 'Raximbaev Xikmat Jumanazarovich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: 'Member' },
    { id: 12, fullName: 'Samandarov Bunyod G‘ayratovich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: 'Member' },
    { id: 13, fullName: 'Yusupov Firnafas', degree: 't.f.n., dotsent', city: '(Urganch)', role: 'Member' },
    { id: 14, fullName: 'Xalmuratov Omonboy Utamuratovich', degree: 't.f.f.d. (PhD)', city: '(Urganch)', role: 'Member' },
    { id: 15, fullName: 'Madaminov Uktamjon Ataxanovich', degree: 'p.f.f.d. (PhD)', city: '(Urganch)', role: 'Member' },
    { id: 16, fullName: 'Madatov Xabibulla Axmedovich', degree: 't.f.f.d. (PhD), dotsent', city: '(Urganch)', role: 'Member' },
    { id: 17, fullName: 'Mengliyev Davlatyor Baxtiyarovich', degree: 't.f.f.d. (PhD)', city: '(Seoul)', role: 'Member' },
    // ... yana 70 ga yaqin a'zo
];