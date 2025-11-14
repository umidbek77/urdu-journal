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
    degree: string;
    imageUrl?: string;
    city: string;

    role?:
        | 'Editor-in-Chief'
        | 'Executive Secretary'
        | 'Member'
        | 'Bosh muharrir'
        | 'Bosh muharrir o‘rinbosari'
        | 'Muharrir kotib'
        | 'Muharrir'
        | string; // <--- BUNGA E’TIBOR BER! Hammasini qabul qiladi
}
