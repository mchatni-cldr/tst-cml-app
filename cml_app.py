"""
Cloudera ML Application Entry Point
"""
import os
import sys
import subprocess

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

def build_frontend():
    """Build React frontend"""
    print("=" * 60)
    print("Building frontend...")
    print("=" * 60)
    
    frontend_dir = os.path.join(os.path.dirname(__file__), 'frontend')
    
    # Install npm dependencies
    print("\n📦 Installing npm packages...")
    result = subprocess.run(
        ['npm', 'install'], 
        cwd=frontend_dir,
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        print("❌ npm install failed:")
        print(result.stderr)
        raise Exception("Frontend build failed at npm install")
    
    print("✅ npm install complete")
    
    # Build production bundle
    print("\n🔨 Building production bundle...")
    result = subprocess.run(
        ['npm', 'run', 'build'], 
        cwd=frontend_dir,
        capture_output=True,
        text=True
    )
    
    if result.returncode != 0:
        print("❌ npm build failed:")
        print(result.stderr)
        raise Exception("Frontend build failed at npm build")
    
    print("✅ Frontend build complete!")
    print("=" * 60)

def main():
    # Check if frontend needs building
    dist_path = os.path.join(os.path.dirname(__file__), 'frontend/dist/index.html')
    
    if not os.path.exists(dist_path):
        print("Frontend not built yet, building now...")
        build_frontend()
    else:
        print("✅ Frontend already built (frontend/dist exists)")
    
    # Import and run Flask app
    from backend.app import app
    
    # Get port from CML environment
    port = int(os.environ.get('CDSW_APP_PORT', 8080))
    
    print("\n" + "=" * 60)
    print(f"🚀 Starting Test App on port {port}")
    print(f"📡 API available at: /api/hello")
    print(f"🌐 Frontend available at: /")
    print("=" * 60 + "\n")
    
    # Start Flask
    app.run(
        host='127.0.0.1',
        port=port,
        debug=False,
        threaded=True
    )

if __name__ == '__main__':
    main()