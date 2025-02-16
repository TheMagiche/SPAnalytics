        
import React from 'react';
//@ts-ignore
import Mermaid from 'react-mermaid2';
import './ProcurementFlowchart.module.css';

const ProcurementFlowchart = () => {
  const flowchartDefinition = `
    flowchart TD
        A[User Arrives] --> B{Has Account?}
        B -->|No| C[Sign Up]
        B -->|Yes| D[Login]
        
        C --> E[Complete Organization Profile]
        D --> F[Dashboard Home]
        E --> F
        
        F --> G{Select Action}
        
        %% Procurement Activities Branch
        G -->|Add New| H[New Procurement Activity]
        H --> H1[Select Supplier]
        H1 --> H2[Enter Purchase Details]
        H2 --> H3[Add Supporting Documents]
        H3 --> H4[Submit for Review]
        H4 --> F
        
        %% Analytics Branch
        G -->|View Analytics| I[Analytics Dashboard]
        I --> I1[View Anomalies]
        I --> I2[View Trends]
        I --> I3[View Regional Insights]
        
        %% Drill Down Branch
        I1 --> J[Detailed Analysis]
        I2 --> J
        I3 --> J
        
        J --> K[Export Reports]
        J --> L[Share Insights]
        
        %% Settings Branch
        G -->|Configure| M[Settings]
        M --> M1[Set Alert Thresholds]
        M --> M2[Configure Regions]
        M --> M3[Manage Users]
        
        %% Filter Branch
        G -->|Filter Data| N[Apply Filters]
        N --> N1[By Date Range]
        N --> N2[By Region]
        N --> N3[By Supplier]
        N1 --> F
        N2 --> F
        N3 --> F
        
        style A fill:#f9f,stroke:#333,stroke-width:2px
        style F fill:#bbf,stroke:#333,stroke-width:2px
        style I fill:#bfb,stroke:#333,stroke-width:2px
        style H fill:#fbf,stroke:#333,stroke-width:2px
  `;

  return (
    <div className="flowchart-container">
      <Mermaid
        chart={flowchartDefinition}
        config={{
          theme: 'default',
          securityLevel: 'loose',
          startOnLoad: true,
        }}
      ></Mermaid>
    </div>
  );
};

export default ProcurementFlowchart; 