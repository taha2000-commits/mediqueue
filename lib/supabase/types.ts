export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          created_at: string
          date: string
          doctor_id: string | null
          id: number
          is_expired: boolean | null
          notes: string | null
          patient_id: string | null
          status: Database["public"]["Enums"]["status"]
          time: string
          type: Database["public"]["Enums"]["appointment_type"]
        }
        Insert: {
          created_at?: string
          date: string
          doctor_id?: string | null
          id?: number
          is_expired?: boolean | null
          notes?: string | null
          patient_id?: string | null
          status?: Database["public"]["Enums"]["status"]
          time?: string
          type?: Database["public"]["Enums"]["appointment_type"]
        }
        Update: {
          created_at?: string
          date?: string
          doctor_id?: string | null
          id?: number
          is_expired?: boolean | null
          notes?: string | null
          patient_id?: string | null
          status?: Database["public"]["Enums"]["status"]
          time?: string
          type?: Database["public"]["Enums"]["appointment_type"]
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_with_appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      doctor_availability: {
        Row: {
          created_at: string
          doctor_id: string | null
          id: number
          weekly_schedule: Json
        }
        Insert: {
          created_at?: string
          doctor_id?: string | null
          id?: number
          weekly_schedule: Json
        }
        Update: {
          created_at?: string
          doctor_id?: string | null
          id?: number
          weekly_schedule?: Json
        }
        Relationships: [
          {
            foreignKeyName: "doctor_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "doctor_availability_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          avatar: string
          avatar_updated_at: string | null
          buffer_time: number | null
          created_at: string
          description_ar: string | null
          description_en: string | null
          email: string
          id: string
          is_active: boolean | null
          language: Database["public"]["Enums"]["language"] | null
          name_ar: string
          name_en: string
          phone: string | null
          slot_duration: number | null
          specialization_ar: string
          specialization_en: string
        }
        Insert: {
          avatar?: string
          avatar_updated_at?: string | null
          buffer_time?: number | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          email?: string
          id: string
          is_active?: boolean | null
          language?: Database["public"]["Enums"]["language"] | null
          name_ar?: string
          name_en?: string
          phone?: string | null
          slot_duration?: number | null
          specialization_ar?: string
          specialization_en?: string
        }
        Update: {
          avatar?: string
          avatar_updated_at?: string | null
          buffer_time?: number | null
          created_at?: string
          description_ar?: string | null
          description_en?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          language?: Database["public"]["Enums"]["language"] | null
          name_ar?: string
          name_en?: string
          phone?: string | null
          slot_duration?: number | null
          specialization_ar?: string
          specialization_en?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          age: number
          allergies: string[] | null
          blood_group: Database["public"]["Enums"]["blood_group"]
          conditions: string[]
          created_at: string
          doctor_id: string
          email: string | null
          gender: Database["public"]["Enums"]["gender"]
          id: string
          medications: string[]
          name: string
          phone: string
        }
        Insert: {
          age: number
          allergies?: string[] | null
          blood_group: Database["public"]["Enums"]["blood_group"]
          conditions?: string[]
          created_at?: string
          doctor_id: string
          email?: string | null
          gender: Database["public"]["Enums"]["gender"]
          id: string
          medications?: string[]
          name: string
          phone: string
        }
        Update: {
          age?: number
          allergies?: string[] | null
          blood_group?: Database["public"]["Enums"]["blood_group"]
          conditions?: string[]
          created_at?: string
          doctor_id?: string
          email?: string | null
          gender?: Database["public"]["Enums"]["gender"]
          id?: string
          medications?: string[]
          name?: string
          phone?: string
        }
        Relationships: []
      }
    }
    Views: {
      appointments_with_priority: {
        Row: {
          appointment_datetime: string | null
          created_at: string | null
          date: string | null
          doctor_id: string | null
          id: number | null
          is_expired: boolean | null
          notes: string | null
          patient: Json | null
          patient_id: string | null
          priority: string | null
          remaining_time: string | null
          status: Database["public"]["Enums"]["status"] | null
          time: string | null
          type: Database["public"]["Enums"]["appointment_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "doctors_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_with_appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors_stats: {
        Row: {
          active_doctors: number | null
          am_doctors_count: number | null
          doctors_leaves_today_count: number | null
          doctors_off_today_count: number | null
          doctors_per_specialization: Json | null
          pm_doctors_count: number | null
          total_doctors: number | null
        }
        Relationships: []
      }
      doctors_with_stats: {
        Row: {
          appointments_count: number | null
          avatar: string | null
          avatar_updated_at: string | null
          buffer_time: number | null
          capacity_percent: number | null
          created_at: string | null
          description_ar: string | null
          description_en: string | null
          email: string | null
          id: string | null
          is_active: boolean | null
          language: Database["public"]["Enums"]["language"] | null
          name_ar: string | null
          name_en: string | null
          patients_count: number | null
          phone: string | null
          slot_duration: number | null
          specialization_ar: string | null
          specialization_en: string | null
          today_appointments_count: Json | null
          today_patients_count: number | null
        }
        Relationships: []
      }
      hospital_stats: {
        Row: {
          accepted_requests_count: number | null
          all_appointments_count: number | null
          am_doctors_count: number | null
          doctors_count: number | null
          doctors_leaves_today_count: number | null
          doctors_off_today_count: number | null
          expired_requests_count: number | null
          high_priority_requests_count: number | null
          no_show_appointments_count: number | null
          patients_count: number | null
          pending_appointments_count: number | null
          pm_doctors_count: number | null
          today_appointments_count: number | null
        }
        Relationships: []
      }
      patient_last_visits: {
        Row: {
          date: string | null
          patient_id: string | null
          time: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_with_appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_next_appointments: {
        Row: {
          date: string | null
          patient_id: string | null
          time: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients_with_appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      patients_with_appointments: {
        Row: {
          active: boolean | null
          age: number | null
          allergies: string[] | null
          blood_group: Database["public"]["Enums"]["blood_group"] | null
          conditions: string[] | null
          created_at: string | null
          doctor_id: string | null
          email: string | null
          gender: Database["public"]["Enums"]["gender"] | null
          has_appointment_today: boolean | null
          id: string | null
          last_visit_date: string | null
          last_visit_time: string | null
          medications: string[] | null
          name: string | null
          next_appointment_date: string | null
          next_appointment_time: string | null
          phone: string | null
          type: string | null
        }
        Insert: {
          active?: never
          age?: number | null
          allergies?: string[] | null
          blood_group?: Database["public"]["Enums"]["blood_group"] | null
          conditions?: string[] | null
          created_at?: string | null
          doctor_id?: string | null
          email?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          has_appointment_today?: never
          id?: string | null
          last_visit_date?: never
          last_visit_time?: never
          medications?: string[] | null
          name?: string | null
          next_appointment_date?: never
          next_appointment_time?: never
          phone?: string | null
          type?: never
        }
        Update: {
          active?: never
          age?: number | null
          allergies?: string[] | null
          blood_group?: Database["public"]["Enums"]["blood_group"] | null
          conditions?: string[] | null
          created_at?: string | null
          doctor_id?: string | null
          email?: string | null
          gender?: Database["public"]["Enums"]["gender"] | null
          has_appointment_today?: never
          id?: string | null
          last_visit_date?: never
          last_visit_time?: never
          medications?: string[] | null
          name?: string | null
          next_appointment_date?: never
          next_appointment_time?: never
          phone?: string | null
          type?: never
        }
        Relationships: []
      }
    }
    Functions: {
      finish_appointment_with_notes: {
        Args: {
          appointment_id: number
          p_allergies?: string[]
          p_conditions?: string[]
          p_medications?: string[]
          p_notes?: string
        }
        Returns: undefined
      }
      get_appointments_sorted: {
        Args: { sort_order?: string }
        Returns: {
          created_at: string
          date: string
          doctor_id: string | null
          id: number
          is_expired: boolean | null
          notes: string | null
          patient_id: string | null
          status: Database["public"]["Enums"]["status"]
          time: string
          type: Database["public"]["Enums"]["appointment_type"]
        }[]
        SetofOptions: {
          from: "*"
          to: "appointments"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_appointments_stats: {
        Args: { doctor_uuid: string; filter_date?: string }
        Returns: Json
      }
      get_doctor_stats: {
        Args: {
          p_doctor_id?: string
          p_end_date?: string
          p_period?: string
          p_start_date?: string
        }
        Returns: Json
      }
      get_doctors_stats: {
        Args: { p_end_date?: string; p_period?: string; p_start_date?: string }
        Returns: Json
      }
      get_hospital_stats: {
        Args: { p_end_date?: string; p_period?: string; p_start_date?: string }
        Returns: Json
      }
      get_last_week_appointments_stats: {
        Args: never
        Returns: {
          appointments_count: number
          day: string
        }[]
      }
      get_patients_stats: { Args: { doctor_uuid: string }; Returns: Json }
      get_requests_sorted: {
        Args: { doctor_uuid: string; sort_order?: string }
        Returns: {
          appointment_datetime: string | null
          created_at: string | null
          date: string | null
          doctor_id: string | null
          id: number | null
          is_expired: boolean | null
          notes: string | null
          patient: Json | null
          patient_id: string | null
          priority: string | null
          remaining_time: string | null
          status: Database["public"]["Enums"]["status"] | null
          time: string | null
          type: Database["public"]["Enums"]["appointment_type"] | null
        }[]
        SetofOptions: {
          from: "*"
          to: "appointments_with_priority"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_specialization_appointments_stats: {
        Args: { p_period?: string; p_specialization?: string }
        Returns: Json
      }
    }
    Enums: {
      appointment_type: "consultation" | "follow_up"
      blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
      gender: "male" | "female"
      language: "en" | "ar"
      status:
        | "pending"
        | "accepted"
        | "rejected"
        | "cancelled"
        | "completed"
        | "in_progress"
        | "no-show"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      appointment_type: ["consultation", "follow_up"],
      blood_group: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      gender: ["male", "female"],
      language: ["en", "ar"],
      status: [
        "pending",
        "accepted",
        "rejected",
        "cancelled",
        "completed",
        "in_progress",
        "no-show",
      ],
    },
  },
} as const
