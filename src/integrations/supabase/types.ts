export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      audio_cache: {
        Row: {
          audio_url: string
          created_at: string
          file_size_bytes: number | null
          id: string
          language: string
          last_accessed: string
          original_text: string
          text_hash: string
          usage_count: number
          voice_model: string
        }
        Insert: {
          audio_url: string
          created_at?: string
          file_size_bytes?: number | null
          id?: string
          language?: string
          last_accessed?: string
          original_text: string
          text_hash: string
          usage_count?: number
          voice_model?: string
        }
        Update: {
          audio_url?: string
          created_at?: string
          file_size_bytes?: number | null
          id?: string
          language?: string
          last_accessed?: string
          original_text?: string
          text_hash?: string
          usage_count?: number
          voice_model?: string
        }
        Relationships: []
      }
      business_templates: {
        Row: {
          category: string
          content: string | null
          created_at: string
          id: string
          is_active: boolean | null
          text: string
          title: string
          usage_count: number
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          text: string
          title: string
          usage_count?: number
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          text?: string
          title?: string
          usage_count?: number
        }
        Relationships: []
      }
      courses: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          id: string
          price: number
          slug: string
          title: string
          trailer_url_opus_16kbps: string | null
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          price: number
          slug: string
          title: string
          trailer_url_opus_16kbps?: string | null
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          slug?: string
          title?: string
          trailer_url_opus_16kbps?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          detail: Json | null
          id: number
          lead_id: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          detail?: Json | null
          id?: number
          lead_id?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          detail?: Json | null
          id?: number
          lead_id?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_lead_status"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          business_name: string | null
          created_at: string | null
          email: string
          id: string
          industry: string | null
          intent: string | null
          language: string | null
          name: string
          source: string | null
          telegram: string | null
          whatsapp: string
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          email: string
          id?: string
          industry?: string | null
          intent?: string | null
          language?: string | null
          name: string
          source?: string | null
          telegram?: string | null
          whatsapp: string
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          email?: string
          id?: string
          industry?: string | null
          intent?: string | null
          language?: string | null
          name?: string
          source?: string | null
          telegram?: string | null
          whatsapp?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          course_id: string
          created_at: string
          duration: number | null
          id: string
          order_index: number | null
          title: string
          video_url: string | null
        }
        Insert: {
          course_id: string
          created_at?: string
          duration?: number | null
          id?: string
          order_index?: number | null
          title: string
          video_url?: string | null
        }
        Update: {
          course_id?: string
          created_at?: string
          duration?: number | null
          id?: string
          order_index?: number | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_confirmations: {
        Row: {
          amount_naira: number
          created_at: string | null
          flutterwave_tx_ref: string | null
          id: string
          payment_status: string | null
          plan_upgrade: string
          user_email: string
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          amount_naira: number
          created_at?: string | null
          flutterwave_tx_ref?: string | null
          id?: string
          payment_status?: string | null
          plan_upgrade: string
          user_email: string
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          amount_naira?: number
          created_at?: string | null
          flutterwave_tx_ref?: string | null
          id?: string
          payment_status?: string | null
          plan_upgrade?: string
          user_email?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_confirmations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      provisioning_jobs: {
        Row: {
          agent_slug: string | null
          agent_template_id: string
          created_at: string | null
          delivery_summary: Json | null
          id: string
          last_error: string | null
          lead_id: string | null
          priority: number | null
          retries: number | null
          status: string | null
        }
        Insert: {
          agent_slug?: string | null
          agent_template_id: string
          created_at?: string | null
          delivery_summary?: Json | null
          id?: string
          last_error?: string | null
          lead_id?: string | null
          priority?: number | null
          retries?: number | null
          status?: string | null
        }
        Update: {
          agent_slug?: string | null
          agent_template_id?: string
          created_at?: string | null
          delivery_summary?: Json | null
          id?: string
          last_error?: string | null
          lead_id?: string | null
          priority?: number | null
          retries?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "provisioning_jobs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provisioning_jobs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_lead_status"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          amount: number | null
          course_id: string
          created_at: string
          id: string
          paid: boolean | null
          payment_reference: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          course_id: string
          created_at?: string
          id?: string
          paid?: boolean | null
          payment_reference?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          course_id?: string
          created_at?: string
          id?: string
          paid?: boolean | null
          payment_reference?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          created_at: string | null
          endpoint: string
          id: string
          ip_address: unknown | null
          requests_count: number | null
          user_id: string | null
          window_start: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint: string
          id?: string
          ip_address?: unknown | null
          requests_count?: number | null
          user_id?: string | null
          window_start?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint?: string
          id?: string
          ip_address?: unknown | null
          requests_count?: number | null
          user_id?: string | null
          window_start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rate_limits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          content: string
          course_id: string
          created_at: string
          id: string
          rating: number | null
          user_avatar: string | null
          user_name: string
        }
        Insert: {
          content: string
          course_id: string
          created_at?: string
          id?: string
          rating?: number | null
          user_avatar?: string | null
          user_name: string
        }
        Update: {
          content?: string
          course_id?: string
          created_at?: string
          id?: string
          rating?: number | null
          user_avatar?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      tts_requests: {
        Row: {
          audio_url: string | null
          cost_naira: number
          created_at: string
          engine_used: string | null
          id: string
          input_text: string
          is_cached: boolean
          language: string
          processing_time: number | null
          processing_time_ms: number | null
          status: string
          user_id: string
          voice_model: string
        }
        Insert: {
          audio_url?: string | null
          cost_naira?: number
          created_at?: string
          engine_used?: string | null
          id?: string
          input_text: string
          is_cached?: boolean
          language?: string
          processing_time?: number | null
          processing_time_ms?: number | null
          status?: string
          user_id: string
          voice_model?: string
        }
        Update: {
          audio_url?: string | null
          cost_naira?: number
          created_at?: string
          engine_used?: string | null
          id?: string
          input_text?: string
          is_cached?: boolean
          language?: string
          processing_time?: number | null
          processing_time_ms?: number | null
          status?: string
          user_id?: string
          voice_model?: string
        }
        Relationships: [
          {
            foreignKeyName: "tts_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_tracking: {
        Row: {
          agent_slug: string | null
          created_at: string | null
          direction: string | null
          expires_at: string | null
          id: number
          lead_id: string | null
          msg_cost_ngn: number | null
          remaining: number | null
          tokens: number | null
        }
        Insert: {
          agent_slug?: string | null
          created_at?: string | null
          direction?: string | null
          expires_at?: string | null
          id?: number
          lead_id?: string | null
          msg_cost_ngn?: number | null
          remaining?: number | null
          tokens?: number | null
        }
        Update: {
          agent_slug?: string | null
          created_at?: string | null
          direction?: string | null
          expires_at?: string | null
          id?: number
          lead_id?: string | null
          msg_cost_ngn?: number | null
          remaining?: number | null
          tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_tracking_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_tracking_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "v_lead_status"
            referencedColumns: ["id"]
          },
        ]
      }
      user_feedback: {
        Row: {
          created_at: string
          feedback_text: string | null
          feedback_type: string
          id: string
          rating: number | null
          request_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          feedback_type?: string
          id?: string
          rating?: number | null
          request_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          feedback_type?: string
          id?: string
          rating?: number | null
          request_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_feedback_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "tts_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_feedback_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          api_tier: string | null
          business_type: string
          company_name: string | null
          created_at: string
          current_api_usage: number | null
          email: string
          id: string
          location: string
          monthly_api_limit: number | null
          monthly_limit: number
          phone: string | null
          subscription_tier: string
          updated_at: string
          usage_current_month: number
        }
        Insert: {
          api_tier?: string | null
          business_type?: string
          company_name?: string | null
          created_at?: string
          current_api_usage?: number | null
          email: string
          id?: string
          location?: string
          monthly_api_limit?: number | null
          monthly_limit?: number
          phone?: string | null
          subscription_tier?: string
          updated_at?: string
          usage_current_month?: number
        }
        Update: {
          api_tier?: string | null
          business_type?: string
          company_name?: string | null
          created_at?: string
          current_api_usage?: number | null
          email?: string
          id?: string
          location?: string
          monthly_api_limit?: number | null
          monthly_limit?: number
          phone?: string | null
          subscription_tier?: string
          updated_at?: string
          usage_current_month?: number
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_lead_status: {
        Row: {
          agent_slug: string | null
          business_name: string | null
          created_at: string | null
          delivery_summary: Json | null
          email: string | null
          id: string | null
          industry: string | null
          intent: string | null
          language: string | null
          name: string | null
          source: string | null
          status: string | null
          telegram: string | null
          whatsapp: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      increment_user_api_usage: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      increment_user_usage: {
        Args: { user_id: string }
        Returns: undefined
      }
      reset_monthly_usage: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
