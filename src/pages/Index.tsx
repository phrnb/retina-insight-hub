
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Base API URL
export const API_BASE_URL = "http://localhost:8000/api";

// Custom hook for API communication
export const useApi = () => {
  const { toast } = useToast();
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  useEffect(() => {
    // Update token when it changes in localStorage
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(newToken);
  };
  
  const apiRequest = async (
    endpoint: string, 
    method: string = 'GET', 
    data: any = null,
    isFormData: boolean = false
  ) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (!isFormData && data) {
      headers['Content-Type'] = 'application/json';
    }
    
    try {
      const requestOptions: RequestInit = {
        method,
        headers,
      };
      
      if (data) {
        if (isFormData) {
          requestOptions.body = data;
        } else {
          requestOptions.body = JSON.stringify(data);
        }
      }
      
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.detail || 'An error occurred');
      }
      
      return responseData;
    } catch (error: any) {
      toast({
        title: "API Error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return {
    token,
    updateToken,
    get: (endpoint: string) => apiRequest(endpoint),
    post: (endpoint: string, data: any, isFormData: boolean = false) => 
      apiRequest(endpoint, 'POST', data, isFormData),
    put: (endpoint: string, data: any) => apiRequest(endpoint, 'PUT', data),
    delete: (endpoint: string) => apiRequest(endpoint, 'DELETE'),
    isAuthenticated: !!token,
  };
};

const Index = () => {
  return <Outlet />;
};

export default Index;
