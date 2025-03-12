import {
    object,
    string,
    number,
    array,
    mask,
    type Describe,
} from "superstruct";

export type SkillDtoSchema = {
    id: number;
    string: string;
};

export const SkillSchema: Describe<SkillDtoSchema> = object({
    id: number(),
    string: string(),
});

export type SpecializedSubjectDtoSchema = {
    id: number;
    skills: SkillDtoSchema[];
};

export const SpecializedSubjectSchema: Describe<SpecializedSubjectDtoSchema> =
    object({
        id: number(),
        skills: array(SkillSchema),
    });

export type ProgramDtoSchema = {
    id: number;
    title: string;
    specializedSubjects: SpecializedSubjectDtoSchema[];
};

export const ProgramListSchema: Describe<ProgramDtoSchema[]> = array(
    object({
        id: number(),
        title: string(),
        specializedSubjects: array(SpecializedSubjectSchema),
    })
);

export type SkillModelShema = SkillDtoSchema;
export type ProgramModelSchema = Pick<ProgramDtoSchema, "id" | "title"> & {
    skills: SkillModelShema[];
};

export async function fetchPrograms() {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const validatedData = mask(data, ProgramListSchema);

    const resolvedData: ProgramModelSchema[] = validatedData
        .map(({ id, title, specializedSubjects }) => ({
            id,
            title,
            skills: specializedSubjects.flatMap((v) => v.skills),
        }))
        .filter((v) => !!v.skills.length)
        .slice(0, 5);

    return resolvedData;
}
