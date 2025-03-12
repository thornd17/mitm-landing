"use server";

import { fetchPrograms } from "@/model";
import { Section } from "@/ui/section";
import { Metadata } from "next";

// export const generateMetadata Специализированные дисциплины

export async function generateMetadata(): Promise<Metadata> {
    const title = "Специализированные дисциплины";
    const description =
        "Специализированные дисциплины. Практические модули. Работа над собственными проектами: практика групповых взаимодействий, кейс-методы, эссе";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
        },
    };
}

export default async function Page() {
    try {
        const data = await fetchPrograms();

        return (
            <main className="2xl:max-w-[1440px] m-auto px-[16px] 2xl:px-[78px] mb-[40px] md:mb-[170px]">
                <h1 className="font-medium md:font-bold text-[28px] md:text-4xl text-start md:text-center mt-[28px] md:mt-[72px]">
                    Специализированные дисциплины
                </h1>

                <div className="mt-[34px] md:mt-[90px] flex flex-col gap-[26px]">
                    {data.map((program) => (
                        <Section model={program} key={program.id} />
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] mt-[44px] md:mt-[120px]">
                    <article className="px-[22px] md:px-[72px] py-[32px] md:py-[56px] bg-accent text-accent-foreground folded-corner-top">
                        <h2 className="text-[25px] md:text-[36px] font-bold">
                            Практические модули
                        </h2>
                        <p className="text-[20px] font-light mt-[24px]">
                            Работа над собственными проектами: практика
                            групповых взаимодействий, кейс-методы, эссе
                        </p>
                    </article>
                    <article className="px-[22px] md:px-[72px] py-[32px] md:py-[56px] bg-secondary text-secondary-foreground">
                        <h2 className="text-[25px] md:text-[36px] font-bold">
                            Итоговая аттестация
                        </h2>
                        <ul className="mt-[24px] text-[20px] font-light flex flex-col gap-[10px]">
                            <li>
                                Бизнес-проектирование (подготовка итоговой
                                аттестационной работы, консультирование по
                                бизнес-проектированию)
                            </li>
                            <li>Защита итоговой аттестационной работы</li>
                        </ul>
                    </article>
                </div>
            </main>
        );
    } catch {
        return null;
    }
}
