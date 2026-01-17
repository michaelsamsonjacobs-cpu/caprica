export interface ServiceHistoryEpisode {
    branch_of_service: string;
    start_date: string;
    end_date: string;
    discharge_status: string;
    rank: string;
    pay_grade: string;
}

export interface ServiceHistoryResponse {
    data: {
        id: string;
        type: string;
        attributes: {
            first_name: string;
            last_name: string;
            service_history: ServiceHistoryEpisode[];
        };
    };
}

const MOCK_SERVICE_HISTORY: ServiceHistoryResponse = {
    data: {
        id: "mock-veteran-id",
        type: "veteran_service_history_episodes",
        attributes: {
            first_name: "William",
            last_name: "Adama",
            service_history: [
                {
                    branch_of_service: "United States Navy",
                    start_date: "2000-01-01",
                    end_date: "2020-01-01",
                    discharge_status: "HONORABLE",
                    rank: "Commander",
                    pay_grade: "O-5"
                }
            ]
        }
    }
};

export async function getServiceHistory(accessToken: string): Promise<ServiceHistoryResponse> {
    const isMock = process.env.NEXT_PUBLIC_USE_MOCK_VA !== 'false'; // Default to true if missing for demo

    if (isMock) {
        console.log("⚠️ Using MOCK VA Service History Data");
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_SERVICE_HISTORY;
    }

    // Real API Call to VA Sandbox
    const response = await fetch('https://sandbox-api.va.gov/services/veteran_verification/v0/service_history', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`VA API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}
