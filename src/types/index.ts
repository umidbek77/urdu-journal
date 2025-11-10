export interface Issue {
    id: number;
    year: number;
    number: string;
    series: string;
    publishedDate: string;
    seriesName: string;
    coverImage: string;
}

export interface Link {
    name: string;
    logo: string;
    url: string;
}

export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}

// YANGI: Tahririyat kengashi a'zolari uchun
export interface EditorialMember {
    id: number;
    fullName: string;
    degree: string; // Masalan: f.m.i.d., prof.
    city: string; // (Nukus), (Tashkent)
    role?: 'Editor-in-Chief' | 'Executive Secretary' | 'Member';
}