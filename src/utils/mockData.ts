import type {ContactInfo, EditorialMember, Issue, Link} from "../types";

export const MOCK_ISSUES: Issue[] = [
    {
        id: 1,
        year: 2025,
        number: 'Nº1',
        series: '1-seriya',
        publishedDate: '15-noyabr 2025',
        seriesName: "Axborot texnologiyalari", // seriesName ni title o'rnida ishlatamiz
        coverImage: '/img_1.png',
        pdfUrl: '/files/issues/issue_1_2025.pdf', // !!! ISSUE PDF URL QO'SHILDI
        doi: '10.xxxx/jkhit.v1i1', // DOI ixtiyoriy
    },
];

export const USEFUL_LINKS: Link[] = [
    { name: 'Abu Rayhon Beruniy nomidagi Urganch davlat universiteti', logo: 'https://urdu.uz/martxa/martxa/assets/images/logoursu.png', url: 'https://urdu.uz/uz' },
    { name: 'Oliy Attestatsiya Komissiyasi (OAK)', logo: 'https://gorniyvestnik.uz/assets/img/partners/oak.png', url: 'https://www.facebook.com/eduuzofficial/mentions/' },
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


export const EDITORIAL_MEMBERS: EditorialMember[] = [
    { id: 0, fullName: 'Ismoilov Shukurulloh Habibulla o‘g‘li', degree: 'f.-m.f.n.', city: '(Urganch)', role: 'Bosh muharrir', imageUrl: '1. Ismoilov Shukurullox Xabibulloh o‘g‘li.JPG' },
    { id: 1, fullName: 'Allamov Oybek To‘raboyevich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '2. Allamov Oybek To‘raboyevich.jpg' },
    { id: 2, fullName: 'Xalmuratov Omonboy Utamuratovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '3. Xalmuratov Omonboy Utamuratovich.jpg' },
    { id: 3, fullName: 'Matyokubov O‘tkir Karimovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '4. Matyokubov O‘tkir Karimovich.jpg' },
    { id: 4, fullName: 'Abduraxmonova Nilufar Zaynobiddin qizi', degree: 'DSc', city: '(Urganch)', role: 'Muharrir', imageUrl: '5. Abduraxmonova Nilufar Zaynobiddin qizi.jpg' },
    { id: 5, fullName: 'Xo‘jayev Otabek Qadamboyevich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '6. Xo‘jayev Otabek Qadamboyevich.jpg' },
    { id: 6, fullName: 'Mengliyev Davlatyor Baxtiyarovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '7. Mengliyev Davlatyor Baxtiyarovich.jpg' },
    { id: 7, fullName: 'Nishanov Axram Xasanovich', degree: 'DSc', city: '(Urganch)', role: 'Muharrir', imageUrl: '8. Nishanov Axram Xasanovich.jpg' },
    { id: 8, fullName: 'Djumanov Jamoljon Xudayqulovich', degree: 'DSc', city: '(Urganch)', role: 'Muharrir', imageUrl: '9. Djumanov Jamoljon Xudayqulovich.jpg' },
    { id: 9, fullName: 'Madatov Xabibulla Axmedovich', degree: 'f.-m.f.n.', city: '(Urganch)', role: 'Muharrir', imageUrl: '10. Madatov Xabibulla Axmedovich.jpg' },
    { id: 10, fullName: 'Raximbayev Xikmat Jumanazarovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '11. Rаximbаev Xikmаt Jumаnаzаrovich.jpg' },
    { id: 11, fullName: 'Xudaybergenov Timur Arturovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '12. Xudaybergenov Timur Arturovich.JPG' },
    { id: 12, fullName: 'Palvanov Bozorboy Yusupovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '13. Palvanov  Bozorboy Yusupovich.jpg' },
    { id: 13, fullName: 'Setmetov Ne’matjon Urunboyevich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '14. Setmetov Ne’matjon Urunboyevich.jpg' },
    { id: 14, fullName: 'Yusupov Firnafas', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '14. Yusupov Firnafas.jpg' },
    { id: 15, fullName: 'Samandarov Bunyod G‘ayratovich', degree: 'DSc', city: '(Urganch)', role: 'Muharrir', imageUrl: '15. Samandarov Bunyod G‘ayratovich.jpg' },
    { id: 16, fullName: 'Bobojanov Suxrob G‘ayratovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '16. Bobojanov  Suxrob G’ayratovich.jpg' },
    { id: 17, fullName: 'Madaminov Uktamjon Ataxanovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '17. Madaminov Uktamjon Ataxanovich.png' },
    { id: 18, fullName: 'Xudayberganov Temur Rustamovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '19. Xudayberganov Temur Rustamovich.png' },
    { id: 19, fullName: 'Ismoilov Shavkat Ko‘ziboyevich', degree: 'f.-m.f.n.', city: '(Urganch)', role: 'Muharrir', imageUrl: '20. Ismoilov Shavkat Ko‘ziboyevich.jpg' },
    { id: 20, fullName: 'Abidjanov Alisher Saxibovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '21. Abidjanov Alisher Saxibovich.jpg' },
    { id: 21, fullName: 'Kayumov Shuxrat Shukurovich', degree: 'PhD', city: '(Urganch)', role: 'Muharrir', imageUrl: '22. Kayumov Shuxrat Shukurovich.jpg' },
];



