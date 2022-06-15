# Makefile for nodejs applicatios
# Richard Antal Nagy, 2022
# https://gitlab.com/richardnagy/makefiles


# Settings
pm := yarn
lockfile := yarn.lock
modules := node_modules
node := node
devnode := npx nodemon
depnode := node
main := main.js
debug_args := --trace-exit --trace-uncaught --trace-warnings
deploy_args := 
container := markdown-server
container_port_internal := 8080
container_port_external := 4000


# Run even if a file or folder with the same name exists
.PHONY: dev lint fix test testwatch install deploy start container run new


# Start the application in development mode
dev: $(main) $(modules)
	$(devnode) $(debug_args) $(main)

# Run compile test and eslint
lint: $(modules)
	@echo "Compile test.."
	@$(node) --check $(main)
	@echo "OK"
	@echo "Running ESLint.."
	@npx eslint .
	@echo "OK"

# Fixes auto fixable format errors
fix: $(modules)
	npx eslint . --fix

# Runs tests
test: $(modules)
	NODE_OPTIONS='--experimental-vm-modules' npx jest .

# Runs tests in interactive mode
testwatch: $(modules)
	NODE_OPTIONS='--experimental-vm-modules' npx jest . --watch

# Install packages (development mode)
install: package.json
	$(pm) install

# Install packages (deployment mode)
deploy: $(lockfile)
	@echo "Creating deployment.."
	$(pm) install --silent --prod --frozen-lockfile

# Start the application in deployment mode
start: $(modules)
	$(depnode) $(deploy_args) $(main)

# Create container
container:
	@echo "Building container.. ($(container))"
	@docker build -t $(container) .

# Run container
run:
	@echo "Starting continer.. ($(container))"
	@docker run -p$(container_port_external):$(container_port_internal) $(container)

# Create a new project
new:
	@echo "Creating package.."
	$(pm) init -y
	@echo "Installing default packages.."
	$(pm) add -D eslint nodemon
	@echo 'console.log("Hello Human!")' > $(main)
	@echo New project reated. Run with: make dev


# Auto install packages dependency
$(modules): package.json
	@echo "Dependency inconsistency found, updating.."
	$(MAKE) -s install
