"use client";
import { AlertCircleIcon, Check, Trash, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  SubmitEventHandler,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import z from "zod";

import SpecializationSelect from "@/app/components/SpecializationSelect";
import Loading from "@/app/loading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useShowSuccessIcon } from "@/hooks/useShowSuccessIcon";
import useUser from "@/hooks/useUser";
import { specializations } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { doctor_profile_schema } from "@/lib/validators/update-doctor-profile";

import { saveDoctorData } from "./actions";

export type AddDoctorFormInputs = {
  name_en: string;
  name_ar: string;
  specialization_en: string;
  specialization_ar?: string;
  email: string;
  phone: string;
  description_en: string;
  description_ar: string;
  photo: File;
  buffer_time: number;
  slot_duration: number;
};

type DoctorFormErrors = {
  name_en?: string;
  name_ar?: string;
  specialization_en?: string;
  specialization_ar?: string;
  email?: string;
  phone?: string;
  photo?: string;
  description_en?: string;
  description_ar?: string;
};

const Page = () => {
  const router = useRouter();
  const { data: user, isLoading: isLoadingUser } = useUser();

  const [state, dispatch, isPending] = useActionState(
    saveDoctorData,
    undefined,
  );

  const [validationErrors, setValidationErrors] = useState<DoctorFormErrors>();

  const [file, setFile] = useState<File>();

  const [ar_specialization, setArSpecialization] = useState<string>();

  const { isShow, setIsShow } = useShowSuccessIcon();

  const inputRef = useRef<HTMLInputElement>(null);

  const resetFileInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget);

    const {
      email,
      name_en,
      phone,
      photo,
      specialization_en,
      description_en,
      description_ar,
      name_ar,
      specialization_ar,
    } = Object.fromEntries(
      formData.entries(),
    ) as unknown as AddDoctorFormInputs;

    const validation = doctor_profile_schema.safeParse({
      email,
      name_en,
      name_ar,
      phone,
      photo,
      specialization_en,
      specialization_ar,
      description_en,
      description_ar,
    });

    if (!validation.success) {
      const errors = z.treeifyError(validation.error).properties;

      setValidationErrors({
        email: errors?.email?.errors[0],
        name_en: errors?.name_en?.errors[0],
        phone: errors?.phone?.errors[0],
        photo: errors?.photo?.errors[0],
        specialization_en: errors?.specialization_en?.errors[0],
        name_ar: errors?.name_ar?.errors[0],
        specialization_ar: errors?.specialization_ar?.errors[0],
        description_en: errors?.description_en?.errors[0],
        description_ar: errors?.description_ar?.errors[0],
      });
      e.preventDefault();
    } else {
      setValidationErrors(undefined);
    }
  };

  useEffect(() => {
    const resetFile = () => setFile(undefined);

    const { isSuccess, error } = state || {};

    if (isSuccess && !isPending) {
      setIsShow(true);
      resetFile();

      toast.success("Doctor saved successfully", {
        onAutoClose: () => {
          toast.loading("Redirecting to dashboard...", { id: "loading-toast" });
          router.push("/dashboard");
        },
      });
    }

    if (error) {
      toast.error(error);
    }
    return () => {
      toast.dismiss("loading-toast");
    };
  }, [state, isPending, router, setIsShow]);

  if (!user && isLoadingUser) return <Loading />;

  return (
    <div className="container mx-auto space-y-5 py-20">
      <p className="text-4xl font-bold">Complete your profile</p>
      <Alert className="border-amber-400">
        <AlertDescription className="text-yellow-500 dark:text-yellow-500">
          Hello Doctor, You have been added by the clinic admin, please complete
          your information to verify your account and activate your services
        </AlertDescription>
      </Alert>
      {validationErrors?.photo && (
        <Alert variant={"destructive"}>
          <AlertCircleIcon />
          <AlertTitle>photo invalid</AlertTitle>
          <AlertDescription className="normal-case">
            {validationErrors?.photo}
          </AlertDescription>
        </Alert>
      )}
      <div className="mx-auto max-w-4/5 min-w-3/4">
        <form
          action={dispatch}
          onSubmit={handleSubmit}
          className="grid grid-cols-5 gap-5"
        >
          <div className="border-border bg-secondary flex flex-col items-center gap-4 rounded-2xl border p-4 shadow">
            <Avatar className="outline-background border-background dark:outline-primary h-30 w-30 border-2 shadow-2xl outline-4 after:border-none">
              {file?.name && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={"sffd"}
                  width={120}
                  height={120}
                />
              )}
            </Avatar>
            {file?.name && (
              <div className="text-muted-foreground text-xs normal-case">
                <div className="space-x-1">
                  <span>Name:</span>
                  <p className="flex flex-wrap">
                    {file.name.split("").map((ch, i) => (
                      <span key={i}>{ch}</span>
                    ))}
                  </p>
                </div>
                <p className="space-x-1">
                  <span>Size:</span>
                  <span>
                    {file?.size ? +(file.size / (1024 * 1024)).toFixed(2) : 0}{" "}
                    MB
                  </span>
                </p>
              </div>
            )}
            <div className="grid gap-2">
              <Button
                variant={"outline"}
                className="border-status-completed text-status-completed bg-secondary w-full cursor-pointer rounded-lg"
                asChild
              >
                <FieldLabel htmlFor="picture">
                  <Upload /> <span className="">change photo</span>
                </FieldLabel>
              </Button>
              <Input
                ref={inputRef}
                id="picture"
                name="photo"
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  const size = file?.size;
                  const sizeMB = size ? +(size / (1024 * 1024)).toFixed(2) : 0;

                  if (sizeMB <= 2) {
                    setFile(file);
                  } else toast.error(`File with size ${sizeMB} MB is gte 2 MB`);
                }}
              />
              <Button
                variant={"destructive"}
                className="rounded-lg"
                onClick={() => {
                  resetFileInput();
                  setFile(undefined);
                }}
              >
                <Trash /> <span className="">remove</span>
              </Button>
              <p className="text-muted-foreground text-xs normal-case">
                JPG, PNG, WEBP. Max size 2MB
              </p>
            </div>
          </div>
          <div className="border-border bg-secondary col-span-4 space-y-5 rounded-2xl border p-4 shadow">
            <FieldGroup className="grid grid-cols-2">
              <Field aria-invalid={!!validationErrors?.email}>
                <FieldLabel htmlFor="email">email address</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  aria-invalid={!!validationErrors?.email}
                  defaultValue={user?.email}
                  className="bg-background rounded-lg"
                  readOnly
                />
                <FieldError className="text-xs">
                  {validationErrors?.email}
                </FieldError>
              </Field>
              <Field aria-invalid={!!validationErrors?.phone}>
                <FieldLabel htmlFor="phone">phone number</FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  aria-invalid={!!validationErrors?.phone}
                  className="bg-background rounded-lg"
                />
                <FieldError className="text-xs">
                  {validationErrors?.phone}
                </FieldError>
              </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-2">
              <Field aria-invalid={!!validationErrors?.name_en}>
                <FieldLabel htmlFor="full-name">full name</FieldLabel>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">Dr.</span>
                  <Input
                    id="full-name"
                    name="name_en"
                    aria-invalid={!!validationErrors?.name_en}
                    className="bg-background rounded-lg"
                  />
                </div>
                <FieldError className="text-xs">
                  {validationErrors?.name_en}
                </FieldError>
              </Field>
              <Field aria-invalid={!!validationErrors?.name_ar}>
                <FieldLabel htmlFor="full-name">arabic full name</FieldLabel>
                <div className="flex flex-row-reverse items-center gap-2">
                  <span className="text-muted-foreground text-sm">.د</span>
                  <Input
                    id="full-name"
                    name="name_ar"
                    aria-invalid={!!validationErrors?.name_ar}
                    dir="rtl"
                    className="bg-background rounded-lg"
                    prefix="د."
                  />
                </div>
                <FieldError className="text-xs">
                  {validationErrors?.name_ar}
                </FieldError>
              </Field>
            </FieldGroup>
            <FieldGroup className="grid grid-cols-2">
              <Field aria-invalid={!!validationErrors?.specialization_en}>
                <FieldLabel htmlFor="specialization">specialization</FieldLabel>
                <SpecializationSelect
                  name="specialization_en"
                  use_search_params={false}
                  onChange={(val) => {
                    const arVal = specializations.find((sp) =>
                      sp["en"].includes(val),
                    )?.["ar"];
                    setArSpecialization(arVal);
                  }}
                  className="bg-background rounded-lg"
                />
                <FieldError className="text-xs">
                  {validationErrors?.specialization_en}
                </FieldError>
              </Field>
              <Field aria-invalid={!!validationErrors?.specialization_ar}>
                <FieldLabel htmlFor="specialization_ar">
                  specialization in arabic
                </FieldLabel>
                <Input
                  id="specialization_ar"
                  name="specialization_ar"
                  aria-invalid={!!validationErrors?.specialization_ar}
                  value={ar_specialization}
                  readOnly
                  dir="rtl"
                  className="bg-background rounded-lg"
                />
                <FieldError className="text-xs">
                  {validationErrors?.specialization_ar}
                </FieldError>
              </Field>
            </FieldGroup>

            <FieldGroup className="grid grid-cols-2">
              <Field className="bg-background rounded-2xl p-4">
                <FieldLabel htmlFor="description_en">
                  about me in english
                </FieldLabel>
                <Textarea
                  id="description_en"
                  name="description_en"
                  placeholder="Type your message here."
                />
                <FieldError className="text-xs">
                  {validationErrors?.description_en}
                </FieldError>
              </Field>
              <Field className="bg-background rounded-2xl p-4">
                <FieldLabel htmlFor="description_ar">
                  about me in arabic
                </FieldLabel>
                <Textarea
                  id="description_ar"
                  name="description_ar"
                  placeholder="Type your message here."
                />
                <FieldError className="text-xs">
                  {validationErrors?.description_ar}
                </FieldError>
              </Field>
            </FieldGroup>
            <FieldGroup className="grid max-w-2/3 grid-cols-2">
              <Field className="flex flex-col gap-2">
                <FieldLabel className="">default slot duration</FieldLabel>
                <div>
                  <Select name="slot_duration" defaultValue={"60"}>
                    <SelectTrigger className="border-ring w-full border">
                      <SelectValue placeholder="slot duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-muted-foreground mt-1 text-xs normal-case">
                    Default duration for new slots
                  </p>
                </div>
              </Field>
              <Field className="flex flex-col gap-2">
                <FieldLabel className="">default buffer time</FieldLabel>
                <div className="">
                  <Select name="buffer_time" defaultValue={"60"}>
                    <SelectTrigger className="border-ring w-full border">
                      <SelectValue placeholder="buffer time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="60">60</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription className="text-muted-foreground mt-1 text-xs normal-case">
                    Time after each period
                  </FieldDescription>
                </div>
              </Field>
            </FieldGroup>
            <div className="flex justify-end">
              <Button
                type="submit"
                className={cn(
                  "bg-tertiary rounded-lg",
                  isShow && "bg-status-accepted",
                )}
              >
                {isShow ? (
                  <Check className="transition-all duration-200" />
                ) : isPending ? (
                  <Spinner />
                ) : null}
                save changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
