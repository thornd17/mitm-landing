'use server'

import { Module } from "@/ui/module";
import { ProgramModelSchema} from "../model";
import { splitArray } from "../utils";

export const Section = async ({ model }: { model: ProgramModelSchema }) => {
    const [moduleModel1, moduleModel2] = splitArray(model.skills);

    return (
        <section aria-labelledby={`section-${model.id}-title`}>
            <h2 id={`section-${model.id}-title`} className="font-bold text-[26px]">
                {model.title}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px] md:gap-[32px] mt-[27px] md:mt-[54px]">
                <Module title="1 модуль" model={moduleModel1} />
                <Module title="2 модуль" model={moduleModel2} />
            </div>
        </section>
    );
};